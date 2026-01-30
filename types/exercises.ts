/**
 * Types génériques pour le système multi-exercices
 * Neuroptimize POC - Ticket Multi-Exercices
 */

export type ExerciseType = 'neural_network' | 'verbal_memory';

export interface ExerciseConfig {
  type: ExerciseType;
  title: string;
  description: string;
  cognitiveFunction: string;
  icon?: string;
}

export const EXERCISES: Record<ExerciseType, ExerciseConfig> = {
  neural_network: {
    type: 'neural_network',
    title: 'Le Réseau Neural',
    description: 'Mémorise et reproduis une séquence de neurones actifs',
    cognitiveFunction: 'Mémoire de travail visuo-spatiale',
    icon: '🧠',
  },
  verbal_memory: {
    type: 'verbal_memory',
    title: 'Mémoire Verbale',
    description: "Mémorise et reproduis une liste de mots dans l'ordre",
    cognitiveFunction: 'Mémoire de travail verbale',
    icon: '📝',
  },
};
