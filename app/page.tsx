/**
 * Page principale - Orchestre Chat + ExerciseRenderer
 * Neuroptimize POC v5.3 - Multi-Exercices
 */

'use client';

import { useState } from 'react';
import { ChatContainer } from '@/components/ChatContainer';
import { ExerciseRenderer } from '@/components/ExerciseRenderer';
import { useExerciseState } from '@/hooks/useExerciseState';
import { EXERCISES, type ExerciseType } from '@/types/exercises';

export default function HomePage() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>('neural_network');
  const exercise = useExerciseState(selectedExercise);

  console.log('[PAGE RENDER] phase:', exercise.phase, 'exerciseType:', selectedExercise);

  const handleExerciseSelect = (type: ExerciseType) => {
    setSelectedExercise(type);
    // Réinitialiser l'exercice lors du changement
    exercise.stopExercise();
  };

  const currentExerciseConfig = EXERCISES[selectedExercise];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Neuroptimize
          </h1>
          <p className="text-lg text-gray-600">
            Remédiation Cognitive Conversationnelle
          </p>
        </header>

        {/* Layout 2 colonnes : Chat (gauche) + Exercise (droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Colonne Chat avec hauteur fixe et sticky */}
          <div className="flex flex-col h-[calc(100vh-12rem)] lg:sticky lg:top-4">
            <ChatContainer
              exercise={exercise}
              selectedExercise={selectedExercise}
              onExerciseSelect={handleExerciseSelect}
            />
          </div>

          {/* Colonne Exercise avec sticky */}
          <div className="flex flex-col items-center justify-start lg:sticky lg:top-4">
            <ExerciseRenderer
              exerciseType={selectedExercise}
              exercise={exercise}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            POC v5.3 - Exercice "{currentExerciseConfig.title}" {currentExerciseConfig.icon}
          </p>
          <p className="mt-1">
            {currentExerciseConfig.cognitiveFunction}
          </p>
        </footer>
      </div>
    </main>
  );
}
