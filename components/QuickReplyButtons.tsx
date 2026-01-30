/**
 * Composant QuickReplyButtons - Boutons de réponse rapide
 * Désactivation automatique après clic (anti-spam)
 * Neuroptimize POC v5.3 - Ticket #10
 */

'use client';

import { useState } from 'react';

export type QuickReplyButtonsProps = {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
};

export function QuickReplyButtons({
  options,
  onSelect,
  disabled = false,
}: QuickReplyButtonsProps) {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleClick = (option: string) => {
    if (disabled || clickedButton) return;

    setClickedButton(option);
    onSelect(option);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((option, index) => {
        const isClicked = clickedButton === option;
        const isDisabled = disabled || (clickedButton !== null && !isClicked);

        return (
          <button
            key={`${option}-${index}`}
            onClick={() => handleClick(option)}
            disabled={isDisabled}
            className={`
              px-4 py-2 rounded-full text-sm font-medium border
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-synapse-400 focus:ring-offset-2
              ${isClicked
                ? 'bg-synapse-600 text-white border-synapse-600 shadow-lg scale-95'
                : isDisabled
                  ? 'bg-neuro-100 text-deep-900/40 border-transparent cursor-not-allowed'
                  : 'bg-white/50 backdrop-blur-sm border-synapse-200 text-synapse-700 hover:bg-synapse-500 hover:text-white hover:border-synapse-500 hover:shadow-md hover:shadow-synapse-500/20 active:scale-95'
              }
            `}
            aria-label={`Réponse rapide: ${option}`}
            aria-pressed={isClicked}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
