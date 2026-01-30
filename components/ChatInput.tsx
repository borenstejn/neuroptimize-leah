/**
 * Composant ChatInput - Champ de saisie pour discuter librement avec Max
 * Permet une conversation en dehors des boutons de réponse rapide
 */

'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = 'Discutez avec Max...',
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled || isSending) return;

    const message = input.trim();
    setInput('');
    setIsSending(true);

    try {
      await onSendMessage(message);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Envoyer avec Enter seul (sauf si Cmd/Ctrl est appuyé pour retour à la ligne)
    if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    // Cmd/Ctrl+Enter fait un retour à la ligne (comportement par défaut)
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
      <div className="flex gap-3 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isSending}
          rows={1}
          className="flex-1 px-4 py-3 text-sm bg-white/50 border border-white/60 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-synapse-400 focus:border-transparent focus:bg-white/80 placeholder:text-deep-900/40 text-deep-900 disabled:opacity-50 transition-all shadow-sm min-h-[48px]"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled || isSending}
          className="px-4 py-3 bg-gradient-to-r from-synapse-500 to-electric-500 text-white font-medium rounded-xl shadow-lg hover:shadow-synapse-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center min-h-[48px] min-w-[48px]"
        >
          {isSending ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          )}
        </button>
      </div>
      <p className="text-[10px] text-deep-900/40 px-2 text-right">
        <span className="font-medium">Entrée</span> pour envoyer
      </p>
    </form>
  );
}
