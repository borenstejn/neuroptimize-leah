/**
 * Composant ChatContainer - Conteneur principal du chat
 * Orchestre MessageList, QuickReplyButtons, TypingIndicator
 * Neuroptimize POC v5.3 - Ticket #11
 */

'use client';

import { useState, useCallback, useRef } from 'react';
import { MessageList } from './MessageList';
import { QuickReplyButtons } from './QuickReplyButtons';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { useExerciseState } from '@/hooks/useExerciseState';
import { EXERCISES, type ExerciseType } from '@/types/exercises';
import type { Message } from '@/types/exercise';

/**
 * Parse les boutons d'une réponse complète
 */
function parseButtonsFromText(text: string): { message: string; buttons?: string[] } {
  const buttonRegex = /<buttons>\s*([\s\S]*?)\s*<\/buttons>/i;
  const match = text.match(buttonRegex);

  if (!match) {
    return { message: text };
  }

  const buttonsText = match[1];
  const buttons = buttonsText
    .split('\n')
    .map((btn) => btn.trim())
    .filter((btn) => btn.length > 0 && !btn.startsWith('-') && !btn.match(/^\d+\./));

  const cleanMessage = text.replace(buttonRegex, '').trim();

  return {
    message: cleanMessage,
    buttons: buttons.length > 0 ? buttons : undefined,
  };
}

interface ChatContainerProps {
  exercise: ReturnType<typeof useExerciseState>;
  selectedExercise: ExerciseType;
  onExerciseSelect: (type: ExerciseType) => void;
}

export function ChatContainer({
  exercise,
  selectedExercise,
  onExerciseSelect
}: ChatContainerProps) {
  const [isTyping, setIsTyping] = useState(false); // Pour les transitions d'exercice
  const [isStreaming, setIsStreaming] = useState(false); // Pour le streaming des messages
  const [streamingContent, setStreamingContent] = useState('');
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const currentExerciseConfig = EXERCISES[selectedExercise];

  /**
   * Gestion de l'envoi d'un message avec streaming
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

      // Préparer le streaming
      setIsStreaming(true);
      setStreamingContent('');
      setIsAwaitingResponse(true);

      // Créer un AbortController pour pouvoir annuler
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: newHistory,
            exerciseType: selectedExercise,
            stream: true,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullContent = '';

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  continue;
                }
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    fullContent += parsed.content;
                    setStreamingContent(fullContent);
                  }
                } catch {
                  // Ignorer les erreurs de parsing
                }
              }
            }
          }
        }

        // Streaming terminé - parser les boutons et finaliser
        const { message: cleanMessage, buttons } = parseButtonsFromText(fullContent);

        // Remplacer le contenu streaming par le message final avec boutons
        setIsStreaming(false);
        setStreamingContent('');

        const assistantMsg: Message = {
          role: 'assistant',
          content: cleanMessage,
          buttons: buttons,
        };
        exercise.addMessage(assistantMsg);

        // Mettre à jour l'historique
        setConversationHistory([
          ...newHistory,
          { role: 'assistant', content: cleanMessage },
        ]);
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          console.log('Request aborted');
          return;
        }
        console.error('Error sending message:', error);
        setIsStreaming(false);
        setStreamingContent('');
        const errorMsg: Message = {
          role: 'assistant',
          content: "Désolé, j'ai rencontré un problème technique. Peux-tu réessayer ?",
        };
        exercise.addMessage(errorMsg);
      } finally {
        setIsStreaming(false);
        setIsAwaitingResponse(false);
        abortControllerRef.current = null;
      }
    },
    [exercise, conversationHistory, selectedExercise]
  );

  /**
   * Map button labels to actions
   * Supports both exact matches and fuzzy matching for flexibility
   */
  const mapButtonToAction = useCallback(
    (buttonLabel: string): (() => void) | null => {
      const normalized = buttonLabel.toLowerCase().trim();

      // Exercise selection actions
      if (normalized.includes('réseau neural') || normalized.includes('réseau')) {
        return () => {
          onExerciseSelect('neural_network');
          handleSendMessage('Je choisis le Réseau Neural');
        };
      }

      if (normalized.includes('mémoire verbale') || normalized.includes('verbal')) {
        return () => {
          onExerciseSelect('verbal_memory');
          handleSendMessage('Je choisis Mémoire Verbale');
        };
      }

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
    [exercise, handleSendMessage, onExerciseSelect]
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
    <div className="flex flex-col h-full">
      {/* Header Glass */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-white/30 bg-white/30 backdrop-blur-md">
        <h2 className="text-xl font-display font-semibold text-deep-900">
          Max - Remédiation Cognitive
        </h2>
        <p className="text-sm text-deep-800/70">
          Exercice : {currentExerciseConfig.title} {currentExerciseConfig.icon}
        </p>
      </div>

      {/* Messages - Zone scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
        <MessageList messages={exercise.messages} />

        {/* Message en cours de streaming */}
        {isStreaming && streamingContent && (
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-synapse-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              M
            </div>
            <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <p className="text-deep-900 whitespace-pre-wrap leading-relaxed">
                {streamingContent.replace(/<buttons>[\s\S]*?<\/buttons>/gi, '')}
                <span className="inline-block w-2 h-4 bg-synapse-500 ml-1 animate-pulse rounded-sm align-middle" />
              </p>
            </div>
          </div>
        )}

        {/* Typing indicator pour transitions ou début de streaming */}
        {(isTyping || (isStreaming && !streamingContent)) && <TypingIndicator />}
      </div>

      {/* Quick Reply Buttons */}
      {quickReplyButtons && quickReplyButtons.length > 0 && !isStreaming && !isTyping && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-white/30 bg-white/20">
          <QuickReplyButtons
            options={quickReplyButtons}
            onSelect={handleQuickReply}
            disabled={exercise.isLoading || isAwaitingResponse}
          />
        </div>
      )}

      {/* Chat Input */}
      <div className="flex-shrink-0 px-6 py-4 border-t border-white/30 bg-white/40 backdrop-blur-md">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isAwaitingResponse}
          placeholder="Posez une question à Max sur la remédiation cognitive..."
        />
      </div>

      {/* Status bar (dev only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex-shrink-0 px-6 py-1 bg-deep-900/5 text-xs text-deep-800/50">
          Phase: {exercise.phase} | Level: {exercise.level} | Score:{' '}
          {exercise.currentResult?.score ?? '-'}%
        </div>
      )}
    </div>
  );
}
