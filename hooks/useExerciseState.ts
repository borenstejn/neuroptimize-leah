/**
 * Hook principal pour gérer le state de l'exercice
 * State machine: intro → encoding → retention → recall → feedback
 * Neuroptimize POC v5.3
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  ExerciseState,
  ExercisePhase,
  Position,
  TrialResult,
  Message
} from '@/types/exercise';
import { useSequenceGenerator, isSamePosition } from './useSequenceGenerator';
import { useSound } from './useSound';
import {
  INITIAL_LEVEL,
  MIN_LEVEL,
  MAX_LEVEL,
  ENCODING_DURATION,
  RETENTION_DELAY,
  SUCCESS_THRESHOLD,
  PARTIAL_THRESHOLD,
  SUCCESSES_FOR_LEVEL_UP,
  FALLBACK_MESSAGES,
} from '@/lib/constants';

export function useExerciseState() {
  // State principal
  const [phase, setPhase] = useState<ExercisePhase>('intro');
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [userSequence, setUserSequence] = useState<Position[]>([]);
  const [currentResult, setCurrentResult] = useState<TrialResult | undefined>();
  const [consecutiveSuccesses, setConsecutiveSuccesses] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: FALLBACK_MESSAGES.intro,
      buttons: ['Commencer'],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [encodingIndex, setEncodingIndex] = useState(0);

  // Génération de la séquence
  const currentSequence = useSequenceGenerator(level);

  // Son "bip" pour activation neurone (Ticket #21)
  const sound = useSound(800, 50, 0.3);

  // Refs pour les timers
  const encodingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const retentionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Nettoyage des timers
  useEffect(() => {
    return () => {
      if (encodingTimerRef.current) clearTimeout(encodingTimerRef.current);
      if (retentionTimerRef.current) clearTimeout(retentionTimerRef.current);
    };
  }, []);

  /**
   * Démarre l'exercice (transition intro → encoding)
   */
  const startExercise = useCallback(() => {
    setPhase('encoding');
    setUserSequence([]);
    setCurrentResult(undefined);
    setEncodingIndex(0);
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: FALLBACK_MESSAGES.encoding },
    ]);

    // Animation progressive de l'encoding avec son
    let currentIndex = 0;
    const encodingTimers: NodeJS.Timeout[] = [];

    const animateEncoding = () => {
      if (currentIndex < currentSequence.length) {
        setEncodingIndex(currentIndex + 1);
        sound.play(); // Jouer le son "bip" (Ticket #21)
        currentIndex++;
        const timer = setTimeout(animateEncoding, ENCODING_DURATION);
        encodingTimers.push(timer);
      }
    };

    // Démarrer l'animation
    animateEncoding();

    // Durée totale de l'encoding (500ms par neurone)
    const totalEncodingDuration = currentSequence.length * ENCODING_DURATION;

    // Transition vers retention après l'encoding
    encodingTimerRef.current = setTimeout(() => {
      // Nettoyer les timers d'encoding
      encodingTimers.forEach(clearTimeout);

      setPhase('retention');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: FALLBACK_MESSAGES.retention },
      ]);

      // Transition vers recall après le délai de retention
      retentionTimerRef.current = setTimeout(() => {
        setPhase('recall');
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: FALLBACK_MESSAGES.recall },
        ]);
      }, RETENTION_DELAY);
    }, totalEncodingDuration);
  }, [currentSequence.length, sound]);

  /**
   * Gestion du clic sur un neurone
   */
  const handleNeuronClick = useCallback(
    (position: Position) => {
      if (phase !== 'recall') return;

      // Jouer le son lors du clic (Ticket #21)
      sound.play();

      const newUserSequence = [...userSequence, position];
      setUserSequence(newUserSequence);

      // Vérifier si la séquence est complète
      if (newUserSequence.length === currentSequence.length) {
        // Calculer le score
        const correctCount = newUserSequence.filter((userPos, index) =>
          isSamePosition(userPos, currentSequence[index])
        ).length;

        const score = Math.round((correctCount / currentSequence.length) * 100);
        const isSuccess = score === SUCCESS_THRESHOLD;
        const isPartial = score >= PARTIAL_THRESHOLD && score < SUCCESS_THRESHOLD;
        const isFailed = score < PARTIAL_THRESHOLD;

        const result: TrialResult = {
          score,
          correctCount,
          totalCount: currentSequence.length,
          isSuccess,
          isPartial,
          isFailed,
        };

        setCurrentResult(result);

        // Adapter le niveau
        let newLevel = level;
        let newConsecutiveSuccesses = consecutiveSuccesses;

        if (isSuccess) {
          newConsecutiveSuccesses++;
          if (newConsecutiveSuccesses >= SUCCESSES_FOR_LEVEL_UP) {
            newLevel = Math.min(level + 1, MAX_LEVEL);
            newConsecutiveSuccesses = 0;
          }
        } else if (isFailed) {
          newLevel = Math.max(level - 1, MIN_LEVEL);
          newConsecutiveSuccesses = 0;
        } else {
          // Partiel: pas de changement de niveau mais reset des succès consécutifs
          newConsecutiveSuccesses = 0;
        }

        setLevel(newLevel);
        setConsecutiveSuccesses(newConsecutiveSuccesses);

        // Transition vers feedback
        setPhase('feedback');

        // Message de feedback (simplifié - sera enrichi dans Ticket #4)
        let feedbackMessage = '';
        if (isSuccess) {
          feedbackMessage = `Excellent ! Tu as reproduit la séquence sans erreur (${correctCount}/${currentSequence.length}).`;
        } else if (isPartial) {
          feedbackMessage = `Bien. Tu as mémorisé ${correctCount} sur ${currentSequence.length} éléments.`;
        } else {
          feedbackMessage = `Tu as mémorisé ${correctCount} sur ${currentSequence.length}. C'est un point de départ normal.`;
        }

        if (newLevel > level) {
          feedbackMessage += ` Niveau suivant : ${newLevel}.`;
        } else if (newLevel < level) {
          feedbackMessage += ` On ajuste au niveau ${newLevel}.`;
        }

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: feedbackMessage,
            buttons: ['Continuer', 'Arrêter'],
          },
        ]);
      }
    },
    [phase, userSequence, currentSequence, level, consecutiveSuccesses]
  );

  /**
   * Arrête l'exercice (retour à intro)
   */
  const stopExercise = useCallback(() => {
    setPhase('intro');
    setUserSequence([]);
    setCurrentResult(undefined);
    setEncodingIndex(0);
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: 'Exercice arrêté. À bientôt !',
      },
    ]);

    // Nettoyer les timers
    if (encodingTimerRef.current) clearTimeout(encodingTimerRef.current);
    if (retentionTimerRef.current) clearTimeout(retentionTimerRef.current);
  }, []);

  /**
   * Efface la sélection de l'utilisateur
   */
  const clearSelection = useCallback(() => {
    if (phase === 'recall') {
      setUserSequence([]);
    }
  }, [phase]);

  /**
   * Continue vers le prochain essai (depuis feedback)
   */
  const continueExercise = useCallback(() => {
    startExercise();
  }, [startExercise]);

  // État complet pour l'UI
  const state: ExerciseState = {
    phase,
    level,
    currentSequence,
    userSequence,
    currentResult,
    performanceHistory: {
      consecutiveSuccesses,
      lastResult: currentResult,
    },
    isLoading,
    messages,
    canStop: phase !== 'intro',
    canClearSelection: phase === 'recall' && userSequence.length > 0,
  };

  return {
    // État
    ...state,
    encodingIndex, // Index du neurone en cours d'activation pendant encoding

    // Actions
    startExercise,
    handleNeuronClick,
    stopExercise,
    clearSelection,
    continueExercise,

    // Contrôles audio (Ticket #21)
    isSoundMuted: sound.isMuted,
    toggleSound: sound.toggleMute,
  };
}
