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
  isSoundMuted?: boolean;
  onToggleSound?: () => void;
};

export function ExerciseControls({
  canStop,
  canClear,
  onStop,
  onClear,
  isSoundMuted = false,
  onToggleSound,
}: ExerciseControlsProps) {
  return (
    <div className="flex gap-3 justify-center mt-4 flex-wrap">
      {/* Bouton Arrêter - toujours visible si canStop */}
      {canStop && (
        <button
          onClick={onStop}
          className="px-6 py-2 bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white rounded-xl font-medium shadow-lg hover:shadow-red-500/30 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          aria-label="Arrêter l'exercice"
        >
          Arrêter l'exercice
        </button>
      )}

      {/* Bouton Effacer - visible uniquement pendant recall */}
      {canClear && (
        <button
          onClick={onClear}
          className="px-6 py-2 bg-deep-600/90 hover:bg-deep-700 backdrop-blur-sm text-white rounded-xl font-medium shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-deep-400 focus:ring-offset-2"
          aria-label="Effacer la sélection"
        >
          Effacer la sélection
        </button>
      )}

      {/* Bouton Mute/Unmute Son - toujours visible (Ticket #21) */}
      {onToggleSound && (
        <button
          onClick={onToggleSound}
          className="px-4 py-2 bg-synapse-100 hover:bg-synapse-200 text-synapse-700 rounded-xl font-medium shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-synapse-400 focus:ring-offset-2"
          aria-label={isSoundMuted ? 'Activer le son' : 'Désactiver le son'}
          title={isSoundMuted ? 'Activer le son' : 'Désactiver le son'}
        >
          {isSoundMuted ? '🔇' : '🔊'}
        </button>
      )}
    </div>
  );
}
