/**
 * Composant MessageList - Liste des messages avec auto-scroll
 * Neuroptimize POC v5.3 - Ticket #9
 */

'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import type { Message } from '@/types/exercise';

export type MessageListProps = {
  messages: Message[];
};

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Auto-scroll vers le bas quand de nouveaux messages arrivent
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-2 scroll-smooth"
      style={{ maxHeight: 'calc(100vh - 200px)' }}
    >
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p className="text-center">
            Aucun message pour le moment...
          </p>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble key={`message-${index}`} message={message} />
          ))}
          {/* Élément invisible pour l'auto-scroll */}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
