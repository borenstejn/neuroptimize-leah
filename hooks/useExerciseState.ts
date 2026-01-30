/**
 * Hook principal pour gérer le state de l'exercice
 * State machine: intro → encoding → retention → recall → feedback
 * Neuroptimize POC v5.3 - Multi-Exercices
 */

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import type {
  ExerciseState,
  ExercisePhase,
  Position,
  TrialResult,
  Message
} from '@/types/exercise';
import type { ExerciseType } from '@/types/exercises';
import type { Word } from '@/types/verbal-memory';
import { useSequenceGenerator, isSamePosition } from './useSequenceGenerator';
import { useWordListGenerator } from './useWordListGenerator';
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

/**
 * Hook pour générer la séquence selon le type d'exercice
 * trialCount force une nouvelle séquence à chaque essai
 */
function useExerciseSequence(type: ExerciseType, level: number, trialCount: number): unknown {
  const neuralSequence = useSequenceGenerator(level, trialCount);
  const verbalSequence = useWordListGenerator(level, trialCount);

  return useMemo(() => {
    return type === 'neural_network' ? neuralSequence : verbalSequence;
  }, [type, neuralSequence, verbalSequence]);
}

export function useExerciseState(exerciseType: ExerciseType = 'neural_network') {
  // State principal
  const [phase, setPhase] = useState<ExercisePhase>('intro');
  const [level, setLevel] = useState(INITIAL_LEVEL);
  const [userSequence, setUserSequence] = useState<unknown[]>([]);
  const [currentResult, setCurrentResult] = useState<TrialResult | undefined>();
  const [consecutiveSuccesses, setConsecutiveSuccesses] = useState(0);
  const [trialCount, setTrialCount] = useState(0); // Compteur d'essais pour forcer nouvelle séquence
  const [pendingStart, setPendingStart] = useState(false); // Flag pour démarrer après nouvelle séquence
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: FALLBACK_MESSAGES.intro,
      // Pas de bouton hardcodé - Max décide quand proposer "Commencer l'exercice"
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [encodingIndex, setEncodingIndex] = useState(0);

  // Génération de la séquence selon le type d'exercice (trialCount force nouvelle séquence)
  const currentSequence = useExerciseSequence(exerciseType, level, trialCount);

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

  // Démarrer l'exercice quand pendingStart est true (après génération nouvelle séquence)
  useEffect(() => {
    if (pendingStart && currentSequence) {
      setPendingStart(false);
      // Lancer l'exercice avec la nouvelle séquence
      const sequenceArray = currentSequence as unknown[];

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
        if (currentIndex < sequenceArray.length) {
          setEncodingIndex(currentIndex + 1);
          sound.play();
          currentIndex++;
          const timer = setTimeout(animateEncoding, ENCODING_DURATION);
          encodingTimers.push(timer);
        }
      };

      animateEncoding();

      const totalEncodingDuration = sequenceArray.length * ENCODING_DURATION;

      encodingTimerRef.current = setTimeout(() => {
        encodingTimers.forEach(clearTimeout);
        setPhase('retention');
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: FALLBACK_MESSAGES.retention },
        ]);

        retentionTimerRef.current = setTimeout(() => {
          setPhase('recall');
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: FALLBACK_MESSAGES.recall },
          ]);
        }, RETENTION_DELAY);
      }, totalEncodingDuration);
    }
  }, [pendingStart, currentSequence, sound]);

  /**
   * Démarre l'exercice (transition intro → encoding)
   */
  const startExercise = useCallback(() => {
    // Caster la séquence en tableau pour accéder à length
    const sequenceArray = currentSequence as unknown[];

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
      if (currentIndex < sequenceArray.length) {
        console.log('[ENCODING] Index:', currentIndex + 1, 'Item:', sequenceArray[currentIndex]);
        setEncodingIndex(currentIndex + 1);
        sound.play(); // Jouer le son "bip"
        currentIndex++;
        const timer = setTimeout(animateEncoding, ENCODING_DURATION);
        encodingTimers.push(timer);
      }
    };

    // Démarrer l'animation
    animateEncoding();

    // Durée totale de l'encoding (500ms par élément)
    const totalEncodingDuration = sequenceArray.length * ENCODING_DURATION;

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
  }, [currentSequence, sound]);

  /**
   * Fonction de comparaison générique selon le type d'exercice
   */
  const isItemEqual = useCallback(
    (item1: unknown, item2: unknown): boolean => {
      if (exerciseType === 'neural_network') {
        return isSamePosition(item1 as Position, item2 as Position);
      } else if (exerciseType === 'verbal_memory') {
        return (item1 as Word).id === (item2 as Word).id;
      }
      return false;
    },
    [exerciseType]
  );

  /**
   * Fonction générique de calcul du score et feedback
   */
  const calculateScoreAndFeedback = useCallback(
    (newUserSequence: unknown[]) => {
      const sequenceArray = currentSequence as unknown[];

      // Calculer le score
      const correctCount = newUserSequence.filter((userItem, index) =>
        isItemEqual(userItem, sequenceArray[index])
      ).length;

      const score = Math.round((correctCount / sequenceArray.length) * 100);
      const isSuccess = score === SUCCESS_THRESHOLD;
      const isPartial = score >= PARTIAL_THRESHOLD && score < SUCCESS_THRESHOLD;
      const isFailed = score < PARTIAL_THRESHOLD;

      const result: TrialResult = {
        score,
        correctCount,
        totalCount: sequenceArray.length,
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

      // Message de feedback
      const itemName = exerciseType === 'neural_network' ? 'neurones' : 'mots';
      let feedbackMessage = '';
      if (isSuccess) {
        feedbackMessage = `Excellent ! Tu as reproduit la séquence sans erreur (${correctCount}/${sequenceArray.length} ${itemName}).`;
      } else if (isPartial) {
        feedbackMessage = `Bien. Tu as mémorisé ${correctCount} sur ${sequenceArray.length} ${itemName}.`;
      } else {
        feedbackMessage = `Tu as mémorisé ${correctCount} sur ${sequenceArray.length} ${itemName}. C'est un point de départ normal.`;
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
    },
    [currentSequence, level, consecutiveSuccesses, exerciseType, isItemEqual]
  );

  /**
   * Gestion du clic sur un neurone (exercice neural_network)
   */
  const handleNeuronClick = useCallback(
    (position: Position) => {
      if (phase !== 'recall') return;
      if (exerciseType !== 'neural_network') return;

      const sequenceArray = currentSequence as Position[];

      // Ne pas permettre de cliquer plus que la longueur de la séquence
      if (userSequence.length >= sequenceArray.length) return;

      // Jouer le son lors du clic
      sound.play();

      const newUserSequence = [...userSequence, position];
      setUserSequence(newUserSequence);

      // Vérifier si la séquence est complète
      if (newUserSequence.length === sequenceArray.length) {
        calculateScoreAndFeedback(newUserSequence);
      }
    },
    [phase, exerciseType, userSequence, currentSequence, sound, calculateScoreAndFeedback]
  );

  /**
   * Gestion du clic sur un mot (exercice verbal_memory)
   */
  const handleWordClick = useCallback(
    (word: Word) => {
      if (phase !== 'recall') return;
      if (exerciseType !== 'verbal_memory') return;

      const sequenceArray = currentSequence as Word[];

      // Ne pas permettre de cliquer plus que la longueur de la séquence
      if (userSequence.length >= sequenceArray.length) return;

      // Jouer le son lors du clic
      sound.play();

      const newUserSequence = [...userSequence, word];
      setUserSequence(newUserSequence);

      // Vérifier si la séquence est complète
      if (newUserSequence.length === sequenceArray.length) {
        calculateScoreAndFeedback(newUserSequence);
      }
    },
    [phase, exerciseType, userSequence, currentSequence, sound, calculateScoreAndFeedback]
  );

  /**
   * Arrête l'exercice (retour à intro) avec message
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
   * Reset silencieux (pour changement d'exercice, sans message)
   */
  const resetExercise = useCallback(() => {
    setPhase('intro');
    setUserSequence([]);
    setCurrentResult(undefined);
    setEncodingIndex(0);

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
   * Incrémente trialCount pour forcer une nouvelle séquence
   */
  const continueExercise = useCallback(() => {
    setTrialCount((prev) => prev + 1);
    setPendingStart(true);
  }, []);

  // État complet pour l'UI
  /**
   * Ajoute un message au chat (pour conversation libre avec Max)
   */
  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

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
    exerciseType, // Type d'exercice actuel

    // Actions
    startExercise,
    handleNeuronClick,
    handleWordClick,
    stopExercise,
    resetExercise,
    clearSelection,
    continueExercise,
    addMessage,

    // Contrôles audio (Ticket #21)
    isSoundMuted: sound.isMuted,
    toggleSound: sound.toggleMute,
  };
}
