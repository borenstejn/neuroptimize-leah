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
  const previousLengthRef = useRef(messages.length);

  /**
   * Auto-scroll vers le bas UNIQUEMENT quand un nouveau message est ajouté
   * (pas sur chaque re-render ou modification du tableau)
   */
  useEffect(() => {
    // Ne scroller que si un NOUVEAU message a été ajouté
    if (messages.length > previousLengthRef.current) {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
    }
    previousLengthRef.current = messages.length;
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="p-4 space-y-2"
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
