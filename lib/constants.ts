/**
 * Constantes et configuration de l'exercice
 * Neuroptimize POC v5.3
 */

// Grille
export const GRID_SIZE = 4; // Grille 4x4 (16 neurones)

// Timings (en millisecondes) - Ralentis pour la démo
export const ENCODING_DURATION = 1000; // Durée d'activation de chaque élément (1 seconde)
export const RETENTION_DELAY = 3000; // Délai entre encoding et recall (3 secondes)
export const ANIMATION_DURATION = 300; // Durée des transitions CSS
export const TYPING_INDICATOR_DELAY = 1500; // Temps d'affichage du typing indicator

// Niveaux de difficulté
export const MIN_LEVEL = 3; // Minimum d'éléments à mémoriser
export const MAX_LEVEL = 12; // Maximum d'éléments à mémoriser
export const INITIAL_LEVEL = 3; // Niveau de départ (réduit pour la démo)

// Seuils de performance (en %)
export const SUCCESS_THRESHOLD = 100; // Succès complet
export const PARTIAL_THRESHOLD = 60; // Succès partiel
// < 60% = Échec

// Règles d'adaptation du niveau
export const SUCCESSES_FOR_LEVEL_UP = 2; // Nombre de succès consécutifs pour +1 niveau
export const LEVEL_DOWN_ON_FAIL = true; // Descendre d'un niveau en cas d'échec <60%

// Messages système (fallback)
export const FALLBACK_MESSAGES = {
  intro: `Bonjour ! Je suis Max, spécialisé en remédiation cognitive.

Je suis là pour t'accompagner dans l'entraînement de tes capacités cognitives, notamment ta mémoire de travail.

N'hésite pas à me poser des questions ou à me dire ce que tu aimerais travailler !`,
  encoding: "Observe bien la séquence. Elle ne s'affichera qu'une fois.",
  retention: "Mémorise bien la séquence. À toi dans 2 secondes...",
  recall: "À toi. Clique sur les neurones dans le même ordre.",
  error: "Une erreur est survenue. Réessayons.",
};

// Couleurs des neurones
export const NEURON_COLORS = {
  idle: '#e5e7eb', // Gris
  active: '#3b82f6', // Bleu
  correct: '#22c55e', // Vert
  wrong: '#ef4444', // Rouge
};

// API Configuration (optionnel pour P1)
export const API_TIMEOUT = 5000; // Timeout API en ms
export const API_ENDPOINT = '/api/chat';
