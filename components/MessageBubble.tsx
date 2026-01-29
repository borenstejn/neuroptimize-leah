/**
 * Composant MessageBubble - Bulle de message individuelle
 * Neuroptimize POC v5.3 - Ticket #9
 */

'use client';

import Image from 'next/image';
import type { Message } from '@/types/exercise';

export type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={`flex gap-3 mb-4 animate-fade-in ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Avatar pour messages assistant */}
      {isAssistant && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold shadow-lg">
          <Image
            src="/max-avatar.svg"
            alt="Max"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      )}

      {/* Bulle de message */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-md ${
          isAssistant
            ? 'bg-white text-gray-800 rounded-tl-none'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Boutons de réponse rapide (si présents) */}
        {message.buttons && message.buttons.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.buttons.map((button, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => {
                  // Cette logique sera gérée par le parent (ChatContainer)
                  console.log('Button clicked:', button);
                }}
              >
                {button}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Espace pour alignement des messages utilisateur */}
      {!isAssistant && <div className="flex-shrink-0 w-10" />}
    </div>
  );
}

// Animation CSS (à ajouter dans globals.css)
// @keyframes fade-in {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
