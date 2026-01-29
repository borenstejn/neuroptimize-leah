/**
 * Composant NeuralNetwork - Grille 4x4 de neurones
 * Neuroptimize POC v5.3 - Ticket #6
 */

'use client';

import { Neuron } from './Neuron';
import type { NeuralNetworkProps, Position, NeuronState } from '@/types/exercise';
import { GRID_SIZE } from '@/lib/constants';
import { isSamePosition } from '@/hooks/useSequenceGenerator';

export function NeuralNetwork({
  sequence,
  userSequence,
  phase,
  onNeuronClick,
  encodingIndex,
}: NeuralNetworkProps & { encodingIndex?: number }) {
  /**
   * Détermine l'état visuel d'un neurone à une position donnée
   */
  const getNeuronState = (position: Position): NeuronState => {
    // Pendant l'encoding: afficher les neurones actifs progressivement
    if (phase === 'encoding' && encodingIndex !== undefined) {
      const isInSequence = sequence
        .slice(0, encodingIndex)
        .some((pos) => isSamePosition(pos, position));
      return isInSequence ? 'active' : 'idle';
    }

    // Pendant le feedback: afficher correct/wrong
    if (phase === 'feedback') {
      const userIndex = userSequence.findIndex((pos) =>
        isSamePosition(pos, position)
      );
      if (userIndex !== -1) {
        const expectedPos = sequence[userIndex];
        const isCorrect = isSamePosition(position, expectedPos);
        return isCorrect ? 'correct' : 'wrong';
      }
    }

    // Pendant le recall: afficher les sélections utilisateur
    if (phase === 'recall') {
      const isSelected = userSequence.some((pos) =>
        isSamePosition(pos, position)
      );
      return isSelected ? 'active' : 'idle';
    }

    return 'idle';
  };

  /**
   * Détermine si un neurone est cliquable
   */
  const isNeuronDisabled = (position: Position): boolean => {
    // Cliquable uniquement pendant la phase recall
    return phase !== 'recall';
  };

  /**
   * Génère la grille de positions
   */
  const grid: Position[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowPositions: Position[] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      rowPositions.push({ row, col });
    }
    grid.push(rowPositions);
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="inline-block rounded-lg bg-white/50 backdrop-blur-sm p-6 shadow-xl">
        <div className="grid grid-cols-4 gap-4">
          {grid.map((row, rowIndex) =>
            row.map((position, colIndex) => (
              <Neuron
                key={`neuron-${rowIndex}-${colIndex}`}
                position={position}
                state={getNeuronState(position)}
                onClick={onNeuronClick}
                disabled={isNeuronDisabled(position)}
              />
            ))
          )}
        </div>
      </div>

      {/* Indicateur de phase pour debug (optionnel) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 text-sm text-gray-500">
          Phase: {phase}
          {encodingIndex !== undefined && ` | Encoding: ${encodingIndex}/${sequence.length}`}
          {phase === 'recall' && ` | User: ${userSequence.length}/${sequence.length}`}
        </div>
      )}
    </div>
  );
}
