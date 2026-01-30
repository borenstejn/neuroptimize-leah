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
    idle: 'bg-slate-200 border-2 border-slate-300 hover:bg-slate-300 hover:border-slate-400 hover:shadow-lg active:scale-95 shadow-inner',
    active: 'bg-blue-500 border-2 border-blue-400 scale-110 shadow-[0_0_25px_rgba(59,130,246,0.7)] animate-pulse',
    correct: 'bg-emerald-500 border-2 border-emerald-400 scale-110 shadow-[0_0_25px_rgba(16,185,129,0.7)]',
    wrong: 'bg-red-500 border-2 border-red-400 scale-110 shadow-[0_0_25px_rgba(239,68,68,0.7)] animate-shake',
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

  const fullClassName = `${baseClass} ${stateClasses[state]} ${cursorClass}`;

  if (state === 'active') {
    console.log('[NEURON RENDER] Active neuron at', position, 'classes:', fullClassName);
  }

  return (
    <button
      className={fullClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={`Neurone position ${position.row + 1}-${position.col + 1}, état ${state}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
    />
  );
}
