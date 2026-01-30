/**
 * Types spécifiques à l'exercice de Mémoire Verbale
 * Neuroptimize POC - Ticket Multi-Exercices
 */

export interface Word {
  text: string;
  id: string; // Identifiant unique pour éviter les doublons
}

export interface VerbalMemoryState {
  wordPool: Word[];         // Tous les mots disponibles
  availableWords: Word[];   // Mots affichés pour le recall (séquence + distracteurs)
}
