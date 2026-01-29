/**
 * Composant Neuron - Représente un neurone individuel dans la grille
 * Neuroptimize POC v5.3 - Ticket #5
 */

'use client';

import type { NeuronProps } from '@/types/exercise';

export function Neuron({ state, onClick, position, disabled = false }: NeuronProps) {
  const baseClass =
    'w-16 h-16 md:w-20 md:h-20 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2';

  const stateClasses = {
    idle: 'bg-gray-200 hover:bg-gray-300 hover:scale-105 active:scale-95',
    active: 'bg-blue-500 scale-110 shadow-lg shadow-blue-500/50',
    correct: 'bg-green-500 scale-110 shadow-lg shadow-green-500/50',
    wrong: 'bg-red-500 scale-110 shadow-lg shadow-red-500/50',
  };

  const cursorClass = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  const handleClick = () => {
    if (!disabled) {
      onClick(position);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(position);
    }
  };

  return (
    <button
      className={`${baseClass} ${stateClasses[state]} ${cursorClass}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`Neurone position ${position.row + 1}-${position.col + 1}, état ${state}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
    />
  );
}
