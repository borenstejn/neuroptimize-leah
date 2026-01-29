/**
 * Hook useSound - Génère et joue des sons synthétiques
 * Neuroptimize POC v5.3 - Ticket #21
 *
 * Utilise Web Audio API pour créer des sons simples sans fichier audio externe
 */

'use client';

import { useCallback, useRef, useState } from 'react';

export interface UseSoundReturn {
  play: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

/**
 * Hook pour jouer un son "bip" synthétique
 *
 * @param frequency - Fréquence du son en Hz (défaut: 800Hz)
 * @param duration - Durée du son en ms (défaut: 50ms)
 * @param volume - Volume du son (0-1, défaut: 0.3)
 * @returns {UseSoundReturn} - Fonctions play, toggleMute et état isMuted
 *
 * @example
 * const sound = useSound();
 * sound.play(); // Joue le son
 * sound.toggleMute(); // Mute/unmute
 */
export function useSound(
  frequency: number = 800,
  duration: number = 50,
  volume: number = 0.3
): UseSoundReturn {
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialiser l'AudioContext une seule fois
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      // Support des différents navigateurs
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    return audioContextRef.current;
  }, []);

  const play = useCallback(() => {
    // Ne pas jouer si muté
    if (isMuted) return;

    try {
      const audioContext = getAudioContext();
      if (!audioContext) {
        console.warn('Web Audio API not supported');
        return;
      }

      // Créer l'oscillateur (génère le son)
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      // Configuration de l'oscillateur
      oscillator.type = 'sine'; // Son doux et neutre
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      // Configuration du volume avec fade-out pour éviter le "clic"
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + duration / 1000
      );

      // Connecter oscillateur → gain → destination (sortie audio)
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Jouer le son
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration / 1000);

      // Nettoyer après lecture
      oscillator.onended = () => {
        oscillator.disconnect();
        gainNode.disconnect();
      };
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
    }
  }, [isMuted, frequency, duration, volume, getAudioContext]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    play,
    isMuted,
    toggleMute,
  };
}
