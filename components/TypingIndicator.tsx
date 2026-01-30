/**
 * Composant TypingIndicator - Trois points qui clignotent
 * Neuroptimize POC v5.3 - Ticket #12
 */

'use client';

import Image from 'next/image';

export function TypingIndicator() {
  return (
    <div className="flex gap-3 mb-4 animate-fade-in">
      {/* Avatar Max */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold shadow-lg">
        <Image
          src="/max-avatar.svg"
          alt="Max"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Bulle avec dots */}
      <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-deep-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-deep-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-deep-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
