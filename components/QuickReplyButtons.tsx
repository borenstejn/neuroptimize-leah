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
              px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
              ${
                isClicked
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                  : isDisabled
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700 cursor-pointer hover:scale-105 active:scale-95'
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
