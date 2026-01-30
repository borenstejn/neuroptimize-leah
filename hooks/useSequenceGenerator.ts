/**
 * Hook pour générer des séquences aléatoires de positions
 * Neuroptimize POC v5.3
 */

import { useMemo } from 'react';
import type { Position } from '@/types/exercise';
import { GRID_SIZE } from '@/lib/constants';

/**
 * Génère une séquence aléatoire de positions valides
 * - Pas de doublons consécutifs
 * - Positions dans la grille 4x4 (0-3)
 * - Longueur = level
 * - trialCount force une nouvelle séquence à chaque essai
 */
export function useSequenceGenerator(level: number, trialCount: number = 0): Position[] {
  return useMemo(() => {
    const sequence: Position[] = [];
    let lastPos: Position | null = null;

    // Validation du level
    if (level < 1) {
      console.warn('useSequenceGenerator: level must be >= 1, got', level);
      return [];
    }

    // Génération de la séquence
    while (sequence.length < level) {
      const pos: Position = {
        row: Math.floor(Math.random() * GRID_SIZE),
        col: Math.floor(Math.random() * GRID_SIZE),
      };

      // Pas de doublon consécutif
      const isDuplicate = lastPos && pos.row === lastPos.row && pos.col === lastPos.col;

      if (!isDuplicate) {
        sequence.push(pos);
        lastPos = pos;
      }
    }

    return sequence;
  }, [level, trialCount]);
}

/**
 * Fonction utilitaire pour comparer deux positions
 */
export function isSamePosition(pos1: Position, pos2: Position): boolean {
  return pos1.row === pos2.row && pos1.col === pos2.col;
}

/**
 * Fonction utilitaire pour valider qu'une position est dans la grille
 */
export function isValidPosition(pos: Position): boolean {
  return (
    pos.row >= 0 &&
    pos.row < GRID_SIZE &&
    pos.col >= 0 &&
    pos.col < GRID_SIZE
  );
}
