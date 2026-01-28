"use client";

/**
 * Exemple d'intégration du BreathingWidget dans page.tsx
 * Montre comment câbler le widget avec useChat et le trigger de debrief
 */

import { useState } from "react";
import { useChat } from "ai/react";
import { BreathingWidget } from "@/components/widgets/breathing-widget";
import {
  MAX_INTRO_MESSAGE,
  MOOD_OPTIONS,
  DIAGNOSTIC_MESSAGES,
  DEBRIEF_TRIGGER
} from "@/lib/prompts";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat();
  const [showBreathing, setShowBreathing] = useState(false);
  const [selectedMood, setSelectedMood] = useState<keyof typeof DIAGNOSTIC_MESSAGES | null>(null);

  // Fonction appelée par le bouton "Lancer la session"
  const startSession = () => {
    setShowBreathing(true);
    // On notifie Max silencieusement (optionnel, mais bien pour l'historique)
    append({
      role: "system",
      content: "L'utilisateur a lancé le widget de cohérence cardiaque.",
    });
  };

  // Fonction appelée QUAND LE TIMER EST FINI (Automatic Trigger)
  const handleSessionComplete = () => {
    setShowBreathing(false);
    // LE SECRET SAUCE : On force Max à parler immédiatement
    append({
      role: "user", // Certains providers ignorent les messages "system" côté client
      content: DEBRIEF_TRIGGER,
    });
  };

  // Gérer le clic sur un bouton de mood
  const handleMoodSelect = (moodId: keyof typeof DIAGNOSTIC_MESSAGES) => {
    setSelectedMood(moodId);
    // Envoyer le mood comme message user
    const option = MOOD_OPTIONS.find(o => o.id === moodId);
    if (option) {
      append({
        role: "user",
        content: `${option.emoji} ${option.label}`,
      });
    }
  };

  return (
    <main className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3 max-w-2xl mx-auto">
          {/* Avatar Max */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h1 className="font-semibold text-slate-800">Max</h1>
            <p className="text-xs text-slate-500">Neuro-Coach • Neuroptimize</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Message d'intro (hardcodé) */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-sm">M</span>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
              <p className="text-slate-700 whitespace-pre-line">{MAX_INTRO_MESSAGE}</p>
            </div>
          </div>

          {/* Quick Reply Buttons (si pas de mood sélectionné) */}
          {!selectedMood && (
            <div className="flex flex-wrap gap-2 ml-11">
              {MOOD_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleMoodSelect(option.id as keyof typeof DIAGNOSTIC_MESSAGES)}
                  className="px-4 py-2 bg-white border-2 border-indigo-200 rounded-full text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
                >
                  {option.emoji} {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Messages de la conversation */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">M</span>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 max-w-md ${
                  message.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white border border-slate-200 rounded-tl-none"
                }`}
              >
                <p className={message.role === "user" ? "text-white" : "text-slate-700"}>
                  {message.content}
                </p>
              </div>
            </div>
          ))}

          {/* Bouton Lancer Session (après diagnostic) */}
          {selectedMood && !showBreathing && messages.length > 0 && (
            <div className="flex justify-center">
              <button
                onClick={startSession}
                className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                ▶️ Lancer la session
              </button>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-600 font-bold text-sm">M</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Overlay Widget */}
      {showBreathing && (
        <BreathingWidget
          demoMode={true} // FORCE 60 SECONDES POUR LA DEMO
          onComplete={handleSessionComplete}
          onCancel={() => setShowBreathing(false)}
        />
      )}
    </main>
  );
}
