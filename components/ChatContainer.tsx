/**
 * Composant ChatContainer - Conteneur principal du chat
 * Orchestre MessageList, QuickReplyButtons, TypingIndicator
 * Neuroptimize POC v5.3 - Ticket #11
 */

'use client';

import { useState, useCallback } from 'react';
import { MessageList } from './MessageList';
import { QuickReplyButtons } from './QuickReplyButtons';
import { TypingIndicator } from './TypingIndicator';
import { useExerciseState } from '@/hooks/useExerciseState';
import { generateFeedback } from '@/lib/feedback';
import type { Message } from '@/types/exercise';

export function ChatContainer() {
  const exercise = useExerciseState();
  const [isTyping, setIsTyping] = useState(false);

  /**
   * Gestion des clics sur les boutons de réponse rapide
   */
  const handleQuickReply = useCallback(
    (option: string) => {
      if (option === 'Commencer') {
        setIsTyping(true);
        setTimeout(() => {
          exercise.startExercise();
          setIsTyping(false);
        }, 1000);
      } else if (option === 'Continuer') {
        setIsTyping(true);
        setTimeout(() => {
          exercise.continueExercise();
          setIsTyping(false);
        }, 800);
      } else if (option === 'Arrêter') {
        exercise.stopExercise();
      }
    },
    [exercise]
  );

  /**
   * Extraction des boutons du dernier message assistant
   */
  const getQuickReplyButtons = (): string[] | null => {
    const lastMessage = exercise.messages[exercise.messages.length - 1];
    if (lastMessage?.role === 'assistant' && lastMessage.buttons) {
      return lastMessage.buttons;
    }
    return null;
  };

  const quickReplyButtons = getQuickReplyButtons();

  return (
    <div className="flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Max - Remédiation Cognitive
        </h2>
        <p className="text-sm text-gray-500">
          Exercice : Le Réseau Neural
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList messages={exercise.messages} />
        {isTyping && <TypingIndicator />}
      </div>

      {/* Quick Reply Buttons */}
      {quickReplyButtons && quickReplyButtons.length > 0 && !isTyping && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200">
          <QuickReplyButtons
            options={quickReplyButtons}
            onSelect={handleQuickReply}
            disabled={exercise.isLoading}
          />
        </div>
      )}

      {/* Status bar (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex-shrink-0 px-6 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          Phase: {exercise.phase} | Level: {exercise.level} | Score:{' '}
          {exercise.currentResult?.score ?? '-'}%
        </div>
      )}
    </div>
  );
}
