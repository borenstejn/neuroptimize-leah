/**
 * Composant MessageBubble - Bulle de message individuelle
 * Neuroptimize POC v5.3 - Ticket #9
 */

'use client';

import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
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
        <div className="text-sm md:text-base leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown
            components={{
              // Personnalisation des éléments markdown
              p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-3">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-3">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-bold mb-2">{children}</h3>,
              code: ({ children }) => (
                <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-xs">
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
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
