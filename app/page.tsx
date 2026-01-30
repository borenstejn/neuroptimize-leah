/**
 * Page principale - Orchestre Chat + NeuralNetwork + Controls
 * Neuroptimize POC v5.3 - Ticket #16
 */

'use client';

import { ChatContainer } from '@/components/ChatContainer';
import { NeuralNetwork } from '@/components/NeuralNetwork';
import { ExerciseControls } from '@/components/ExerciseControls';
import { useExerciseState } from '@/hooks/useExerciseState';

export default function HomePage() {
  const exercise = useExerciseState();

  console.log('[PAGE RENDER] phase:', exercise.phase, 'encodingIndex:', exercise.encodingIndex);

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

        {/* Layout 2 colonnes : Chat (gauche) + NeuralNetwork (droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Colonne Chat avec hauteur fixe et sticky */}
          <div className="flex flex-col h-[calc(100vh-12rem)] lg:sticky lg:top-4">
            <ChatContainer exercise={exercise} />
          </div>

          {/* Colonne NeuralNetwork + Controls avec sticky */}
          <div className="flex flex-col items-center justify-start lg:sticky lg:top-4">
            <NeuralNetwork
              sequence={exercise.currentSequence}
              userSequence={exercise.userSequence}
              phase={exercise.phase}
              onNeuronClick={exercise.handleNeuronClick}
              encodingIndex={exercise.encodingIndex}
            />

            {/* Contrôles */}
            <ExerciseControls
              canStop={exercise.canStop}
              canClear={exercise.canClearSelection}
              onStop={exercise.stopExercise}
              onClear={exercise.clearSelection}
              isSoundMuted={exercise.isSoundMuted}
              onToggleSound={exercise.toggleSound}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            POC v5.3 - Exercice "Le Réseau Neural"
          </p>
          <p className="mt-1">
            Mémoire de travail visuo-spatiale
          </p>
        </footer>
      </div>
    </main>
  );
}
