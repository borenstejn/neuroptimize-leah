/**
 * Page principale - Orchestre Chat + ExerciseRenderer
 * Neuroptimize POC v5.3 - Multi-Exercices
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChatContainer } from '@/components/ChatContainer';
import { ExerciseRenderer } from '@/components/ExerciseRenderer';
import { useExerciseState } from '@/hooks/useExerciseState';
import { EXERCISES, type ExerciseType } from '@/types/exercises';

const EXERCISE_LIST: ExerciseType[] = ['neural_network', 'verbal_memory'];

export default function HomePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseType>('neural_network');
  const exercise = useExerciseState(selectedExercise);

  const handleExerciseSelect = (type: ExerciseType) => {
    setSelectedExercise(type);
    exercise.resetExercise(); // Reset silencieux sans message "Exercice arrêté"
  };

  const handleStartChat = () => {
    setShowWelcome(false);
  };

  const currentExerciseConfig = EXERCISES[selectedExercise];

  // Page d'accueil
  if (showWelcome) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* Logo animé / Container Glass */}
          <div className="mb-12 inline-block relative">
            <div className="absolute inset-0 bg-synapse-400 blur-3xl opacity-20 rounded-full animate-pulse-slow"></div>
            <div className="relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full drop-shadow-2xl border-4 border-white/50"
              >
                <source src="/videos/max_logo_animated.mp4" type="video/mp4" />
                <Image
                  src="/assets/avatars/max_avatar_v2.png"
                  alt="Neuroptimize Logo"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </video>
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-6xl md:text-8xl font-bold text-deep-900 mb-6 tracking-tight drop-shadow-sm">
            Neuroptimize
          </h1>

          {/* Sous-titre */}
          <p className="text-xl md:text-2xl text-deep-800/80 mb-12 max-w-lg mx-auto font-light leading-relaxed">
            Remédiation Cognitive Conversationnelle
          </p>

          {/* Bouton */}
          <button
            onClick={handleStartChat}
            className="group relative px-10 py-5 bg-synapse-500 hover:bg-synapse-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-synapse-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Commencer avec Max</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
          </button>

          {/* Description */}
          <p className="mt-12 text-sm text-deep-900/60 max-w-md mx-auto neuro-card p-4 rounded-xl">
            Entraîne ta mémoire de travail avec des exercices adaptatifs
            guidés par une IA spécialisée en neurosciences cognitives.
          </p>
        </div>
      </main>
    );
  }

  // Interface de chat
  return (
    <main className="h-screen overflow-hidden p-4 md:p-6 lg:p-8 relative z-10 flex flex-col">
      <div className="max-w-[1600px] mx-auto w-full flex flex-col flex-1 min-h-0">
        {/* Header avec bouton retour */}
        <header className="flex-shrink-0 flex items-center justify-between mb-6 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowWelcome(true)}
              className="p-2 -ml-2 text-deep-900/60 hover:text-synapse-600 transition-colors rounded-full hover:bg-white/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-deep-900">
                Neuroptimize
              </h1>
              <p className="text-sm text-deep-900/60 hidden md:block">
                Session interactive
              </p>
            </div>
          </div>

          {/* Sélecteur d'exercice */}
          <div className="relative">
            <button
              onClick={() => {
                // Basculer vers l'autre exercice
                const otherExercise = selectedExercise === 'neural_network' ? 'verbal_memory' : 'neural_network';
                handleExerciseSelect(otherExercise);
              }}
              className="group flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white rounded-xl backdrop-blur text-sm font-medium border border-white/60 hover:border-slate-200 transition-all shadow-sm hover:shadow-md"
            >
              <span className="text-lg">{currentExerciseConfig.icon}</span>
              <span className="text-slate-700">{currentExerciseConfig.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400 group-hover:text-slate-600 transition-colors"
              >
                <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/>
              </svg>
            </button>
            <p className="absolute -bottom-5 right-0 text-[10px] text-slate-400 whitespace-nowrap">
              Cliquer pour changer
            </p>
          </div>
        </header>

        {/* Layout 2 colonnes : Chat (gauche) + Exercise (droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
          {/* Colonne Chat (5 cols ≈ 42%) - scroll interne isolé */}
          <div className="lg:col-span-5 min-h-0">
            <div className="h-full neuro-card rounded-3xl overflow-hidden flex flex-col shadow-xl ring-1 ring-white/50">
              <ChatContainer
                exercise={exercise}
                selectedExercise={selectedExercise}
                onExerciseSelect={handleExerciseSelect}
              />
            </div>
          </div>

          {/* Colonne Exercise (7 cols ≈ 58%) - fixe, pas de scroll */}
          <div className="lg:col-span-7 min-h-0">
            <div className="h-full neuro-card rounded-3xl p-6 lg:p-8 shadow-xl ring-1 ring-white/50 relative overflow-hidden flex flex-col items-center justify-center">
              {/* Background accent for exercise area */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white/50 pointer-events-none -z-10" />

              <ExerciseRenderer
                exerciseType={selectedExercise}
                exercise={exercise}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
