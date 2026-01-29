/**
 * Composant ExerciseControls - Contrôles de l'exercice
 * Bouton "Arrêter" permanent + Bouton "Effacer" pendant recall
 * Neuroptimize POC v5.3 - Ticket #14
 */

'use client';

export type ExerciseControlsProps = {
  canStop: boolean;
  canClear: boolean;
  onStop: () => void;
  onClear: () => void;
};

export function ExerciseControls({
  canStop,
  canClear,
  onStop,
  onClear,
}: ExerciseControlsProps) {
  return (
    <div className="flex gap-3 justify-center mt-4">
      {/* Bouton Arrêter - toujours visible si canStop */}
      {canStop && (
        <button
          onClick={onStop}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          aria-label="Arrêter l'exercice"
        >
          Arrêter l'exercice
        </button>
      )}

      {/* Bouton Effacer - visible uniquement pendant recall */}
      {canClear && (
        <button
          onClick={onClear}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          aria-label="Effacer la sélection"
        >
          Effacer la sélection
        </button>
      )}
    </div>
  );
}
