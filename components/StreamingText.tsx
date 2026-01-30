/**
 * Composant StreamingText - Affiche du texte avec effet de fade-in progressif
 * Neuroptimize POC - Streaming Effect
 */

'use client';

import { useEffect, useState, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  className?: string;
}

export function StreamingText({ text, isStreaming, className = '' }: StreamingTextProps) {
  const [displayedChars, setDisplayedChars] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quand le texte change et qu'on stream, animer les nouveaux caractères
  useEffect(() => {
    if (isStreaming && displayedChars < text.length) {
      const timer = setTimeout(() => {
        setDisplayedChars(text.length);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [text, isStreaming, displayedChars]);

  // Reset quand un nouveau message commence
  useEffect(() => {
    if (text.length === 0) {
      setDisplayedChars(0);
    }
  }, [text.length === 0]);

  // Auto-scroll vers le bas pendant le streaming
  useEffect(() => {
    if (containerRef.current && isStreaming) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [text, isStreaming]);

  // Diviser le texte en mots pour l'animation
  const words = text.split(/(\s+)/);
  let charCount = 0;

  return (
    <div ref={containerRef} className={className}>
      {words.map((word, wordIndex) => {
        const wordStart = charCount;
        charCount += word.length;

        // Calculer l'opacité basée sur la position du mot
        const isNewWord = wordStart >= displayedChars - 20;
        const opacity = isStreaming && isNewWord ? 'animate-fade-in' : '';

        return (
          <span
            key={wordIndex}
            className={`inline ${opacity}`}
            style={{
              animationDelay: isStreaming && isNewWord ? `${(wordIndex % 5) * 30}ms` : '0ms',
            }}
          >
            {word}
          </span>
        );
      })}
      {isStreaming && (
        <span className="inline-block w-2 h-5 bg-blue-500 ml-1 animate-pulse rounded-sm" />
      )}
    </div>
  );
}
