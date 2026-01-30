/**
 * Hook pour générer des séquences de mots pour l'exercice Mémoire Verbale
 * Neuroptimize POC - Ticket Multi-Exercices
 */

import { useMemo } from 'react';
import type { Word } from '@/types/verbal-memory';

// Pool de mots simples (concrets, fréquents, 1-2 syllabes)
const WORD_POOL = [
  'chat', 'chien', 'table', 'chaise', 'soleil', 'lune',
  'mer', 'arbre', 'fleur', 'pain', 'eau', 'feu',
  'porte', 'fenêtre', 'main', 'pied', 'tête', 'voiture',
  'maison', 'école', 'livre', 'stylo', 'clé', 'sac',
  'vent', 'pluie', 'neige', 'pierre', 'route', 'pont',
  'lampe', 'lit', 'mur', 'toit', 'bois', 'verre',
  'jour', 'nuit', 'heure', 'temps', 'peur', 'joie',
  'ciel', 'terre', 'oiseau', 'poisson', 'fruit', 'pain',
  'riz', 'lait', 'sel', 'sucre', 'huile', 'beurre',
];

/**
 * Sélectionne count mots aléatoires du pool sans doublons
 */
function getRandomWords(count: number): Word[] {
  // Copier le pool pour ne pas le modifier
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);

  // Prendre les count premiers mots
  const selectedWords = shuffled.slice(0, count);

  // Convertir en objets Word avec id unique
  return selectedWords.map((text, index) => ({
    text,
    id: `${text}-${Date.now()}-${index}`,
  }));
}

/**
 * Génère une séquence de mots aléatoires selon le niveau
 * trialCount force une nouvelle séquence à chaque essai
 */
export function useWordListGenerator(level: number, trialCount: number = 0): Word[] {
  return useMemo(() => {
    return getRandomWords(level);
  }, [level, trialCount]);
}

/**
 * Génère des mots distracteurs (non présents dans la séquence)
 */
export function getRandomDistractors(sequence: Word[], count: number): Word[] {
  const sequenceTexts = new Set(sequence.map(w => w.text));
  const availableWords = WORD_POOL.filter(text => !sequenceTexts.has(text));

  // Mélanger et prendre count mots
  const shuffled = [...availableWords].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  // Convertir en objets Word
  return selected.map((text, index) => ({
    text,
    id: `distractor-${text}-${Date.now()}-${index}`,
  }));
}

/**
 * Mélange un tableau (Fisher-Yates shuffle)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
