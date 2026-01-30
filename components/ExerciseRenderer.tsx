/**
 * Composant ExerciseRenderer - Sélecteur d'exercice
 * Switch entre NeuralNetwork et VerbalMemoryExercise selon le type
 * Neuroptimize POC - Ticket Multi-Exercices
 */

'use client';

import type { ExerciseType } from '@/types/exercises';
import type { Position } from '@/types/exercise';
import type { Word } from '@/types/verbal-memory';
import { NeuralNetwork } from './NeuralNetwork';
import { VerbalMemoryExercise } from './VerbalMemoryExercise';
import { ExerciseControls } from './ExerciseControls';
import { useExerciseState } from '@/hooks/useExerciseState';

interface ExerciseRendererProps {
  exerciseType: ExerciseType;
  exercise: ReturnType<typeof useExerciseState>;
}

export function ExerciseRenderer({ exerciseType, exercise }: ExerciseRendererProps) {
  switch (exerciseType) {
    case 'neural_network':
      return (
        <>
          <NeuralNetwork
            sequence={exercise.currentSequence as unknown as Position[]}
            userSequence={exercise.userSequence as unknown as Position[]}
            phase={exercise.phase}
            onNeuronClick={exercise.handleNeuronClick}
            encodingIndex={exercise.encodingIndex}
          />
          <ExerciseControls
            canStop={exercise.canStop}
            canClear={exercise.canClearSelection}
            onStop={exercise.stopExercise}
            onClear={exercise.clearSelection}
            isSoundMuted={exercise.isSoundMuted}
            onToggleSound={exercise.toggleSound}
          />
        </>
      );

    case 'verbal_memory':
      return (
        <>
          <VerbalMemoryExercise
            sequence={exercise.currentSequence as unknown as Word[]}
            userSequence={exercise.userSequence as unknown as Word[]}
            phase={exercise.phase}
            onWordClick={exercise.handleWordClick}
            encodingIndex={exercise.encodingIndex}
            level={exercise.level}
          />
          <ExerciseControls
            canStop={exercise.canStop}
            canClear={exercise.canClearSelection}
            onStop={exercise.stopExercise}
            onClear={exercise.clearSelection}
            isSoundMuted={exercise.isSoundMuted}
            onToggleSound={exercise.toggleSound}
          />
        </>
      );

    default:
      return null;
  }
}
