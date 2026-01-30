/**
 * Composant VerbalMemoryExercise - Affiche l'exercice de mémoire verbale
 * Neuroptimize POC - Ticket Multi-Exercices
 */

'use client';

import { useMemo } from 'react';
import type { Word } from '@/types/verbal-memory';
import type { ExercisePhase } from '@/types/exercise';
import { getRandomDistractors, shuffle } from '@/hooks/useWordListGenerator';

interface VerbalMemoryExerciseProps {
  sequence: Word[];
  userSequence: Word[];
  phase: ExercisePhase;
  onWordClick: (word: Word) => void;
  encodingIndex?: number;
  level: number;
}

/**
 * Génère les mots disponibles pour le recall (séquence + distracteurs)
 */
function useAvailableWords(sequence: Word[], level: number): Word[] {
  return useMemo(() => {
    // Plus le niveau est élevé, moins il y a de distracteurs (plus difficile)
    const distractorCount = Math.max(12 - level, 4);
    const distractors = getRandomDistractors(sequence, distractorCount);
    return shuffle([...sequence, ...distractors]);
  }, [sequence, level]);
}

export function VerbalMemoryExercise({
  sequence,
  userSequence,
  phase,
  onWordClick,
  encodingIndex,
  level,
}: VerbalMemoryExerciseProps) {
  const availableWords = useAvailableWords(sequence, level);

  return (
    <div className="w-full max-w-2xl">
      {/* Phase encoding : afficher le mot actuel */}
      {phase === 'encoding' && encodingIndex !== undefined && encodingIndex > 0 && (
        <div className="text-center py-12">
          <div className="text-6xl font-bold text-blue-600 animate-pulse mb-6">
            {sequence[encodingIndex - 1]?.text}
          </div>
          <p className="text-sm text-gray-500">
            Mot {encodingIndex} / {sequence.length}
          </p>
        </div>
      )}

      {/* Phase retention : message d'attente */}
      {phase === 'retention' && (
        <div className="text-center py-12">
          <div className="text-3xl text-gray-600 animate-pulse">
            Mémorise...
          </div>
        </div>
      )}

      {/* Phase recall : grille de mots cliquables */}
      {phase === 'recall' && (
        <div className="py-6">
          <p className="text-center mb-6 text-gray-600 font-medium">
            Clique sur les mots dans l'ordre ({userSequence.length} / {sequence.length})
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {availableWords.map((word) => {
              const isSelected = userSequence.some((w) => w.id === word.id);
              const index = userSequence.findIndex((w) => w.id === word.id);

              return (
                <button
                  key={word.id}
                  onClick={() => onWordClick(word)}
                  disabled={isSelected}
                  className={`
                    p-4 rounded-lg font-medium transition-all text-center
                    ${
                      isSelected
                        ? 'bg-blue-500 text-white cursor-not-allowed'
                        : 'bg-white hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-400 cursor-pointer'
                    }
                  `}
                >
                  {isSelected && <span className="text-xs block mb-1">{index + 1}.</span>}
                  <span className="text-lg">{word.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase feedback : afficher résultat */}
      {phase === 'feedback' && (
        <div className="py-6">
          <p className="text-center mb-6 text-gray-600 font-medium text-lg">
            Résultat :
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {userSequence.map((word, idx) => {
              const isCorrect = sequence[idx]?.id === word.id;
              return (
                <div
                  key={`feedback-${word.id}-${idx}`}
                  className={`
                    px-5 py-3 rounded-lg font-medium text-lg
                    ${
                      isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }
                  `}
                >
                  {idx + 1}. {word.text}
                  {isCorrect ? ' ✓' : ' ✗'}
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            {sequence.map((word, idx) => (
              <span key={word.id} className="inline-block mx-1">
                {idx > 0 && '→'} {word.text}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Phase intro : message de bienvenue */}
      {phase === 'intro' && (
        <div className="text-center py-12">
          <div className="text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Mémoire Verbale
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Entraîne ta mémoire de travail verbale en mémorisant des listes de mots.
          </p>
        </div>
      )}
    </div>
  );
}
