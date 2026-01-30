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
import { ChatInput } from './ChatInput';
import { useExerciseState } from '@/hooks/useExerciseState';
import { generateFeedback } from '@/lib/feedback';
import type { Message } from '@/types/exercise';

interface ChatContainerProps {
  exercise: ReturnType<typeof useExerciseState>;
}

export function ChatContainer({ exercise }: ChatContainerProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);

  /**
   * Gestion de l'envoi d'un message libre à Max
   */
  const handleSendMessage = useCallback(
    async (userMessage: string) => {
      // Ajouter le message utilisateur
      const userMsg: Message = {
        role: 'user',
        content: userMessage,
      };
      exercise.addMessage(userMsg);

      // Ajouter à l'historique de conversation
      const newHistory = [
        ...conversationHistory,
        { role: 'user' as const, content: userMessage },
      ];
      setConversationHistory(newHistory);

      // Afficher le typing indicator
      setIsTyping(true);
      setIsAwaitingResponse(true);

      try {
        // Appeler l'API
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: newHistory,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();
        const assistantMessage = data.message;
        const buttons = data.buttons; // Extraire les boutons de l'API

        // Ajouter la réponse de Max avec boutons
        const assistantMsg: Message = {
          role: 'assistant',
          content: assistantMessage,
          buttons: buttons, // Attacher les boutons au message
        };
        exercise.addMessage(assistantMsg);

        // Mettre à jour l'historique
        setConversationHistory([
          ...newHistory,
          { role: 'assistant', content: assistantMessage },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        // Message d'erreur
        const errorMsg: Message = {
          role: 'assistant',
          content:
            "Désolé, j'ai rencontré un problème technique. Peux-tu réessayer ?",
        };
        exercise.addMessage(errorMsg);
      } finally {
        setIsTyping(false);
        setIsAwaitingResponse(false);
      }
    },
    [exercise, conversationHistory]
  );

  /**
   * Map button labels to actions
   * Supports both exact matches and fuzzy matching for flexibility
   */
  const mapButtonToAction = useCallback(
    (buttonLabel: string): (() => void) | null => {
      const normalized = buttonLabel.toLowerCase().trim();

      // Exercise control actions
      if (
        normalized.includes('commencer') ||
        normalized.includes('démarrer') ||
        normalized.includes("lancer")
      ) {
        return () => {
          setIsTyping(true);
          setTimeout(() => {
            exercise.startExercise();
            setIsTyping(false);
          }, 1000);
        };
      }

      if (normalized.includes('continuer') || normalized === 'suivant') {
        return () => {
          setIsTyping(true);
          setTimeout(() => {
            exercise.continueExercise();
            setIsTyping(false);
          }, 800);
        };
      }

      if (normalized.includes('arrêter') || normalized === 'stop') {
        return () => {
          exercise.stopExercise();
        };
      }

      // Conversational actions - trigger a pre-defined user message
      if (normalized.includes('en savoir plus')) {
        return () => {
          handleSendMessage("Peux-tu m'en dire plus sur ce sujet ?");
        };
      }

      if (normalized.includes('stratégie') || normalized.includes('astuce')) {
        return () => {
          handleSendMessage('Quelles stratégies peux-tu me conseiller pour mieux mémoriser ?');
        };
      }

      if (normalized.includes('question')) {
        return () => {
          handleSendMessage('Je voudrais poser une question.');
        };
      }

      if (normalized.includes('hippocampe')) {
        return () => {
          handleSendMessage("Comment fonctionne l'hippocampe exactement ?");
        };
      }

      // Default: send the button text as a user message
      // This handles any custom buttons Claude might suggest
      return () => {
        handleSendMessage(buttonLabel);
      };
    },
    [exercise, handleSendMessage]
  );

  /**
   * Gestion des clics sur les boutons de réponse rapide
   */
  const handleQuickReply = useCallback(
    (option: string) => {
      const action = mapButtonToAction(option);
      if (action) {
        action();
      }
    },
    [mapButtonToAction]
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
            disabled={exercise.isLoading || isAwaitingResponse}
          />
        </div>
      )}

      {/* Chat Input - Toujours visible pour converser avec Max */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isAwaitingResponse}
          placeholder="Posez une question à Max sur la remédiation cognitive..."
        />
      </div>

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
