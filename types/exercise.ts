/**
 * Types TypeScript pour l'exercice de remédiation cognitive
 * Neuroptimize POC v5.3
 */

// Position dans la grille 4x4
export type Position = {
  row: number;
  col: number;
};

// État visuel d'un neurone
export type NeuronState = 'idle' | 'active' | 'correct' | 'wrong';

// Phase de l'exercice
export type ExercisePhase = 'intro' | 'encoding' | 'retention' | 'recall' | 'feedback';

// Message du chat
export type Message = {
  role: 'user' | 'assistant';
  content: string;
  buttons?: string[];
};

// Résultat d'un essai
export type TrialResult = {
  score: number; // Pourcentage (0-100)
  correctCount: number;
  totalCount: number;
  isSuccess: boolean; // true si 100%
  isPartial: boolean; // true si 60-99%
  isFailed: boolean; // true si <60%
};

// Historique de performance (pour adaptation)
export type PerformanceHistory = {
  consecutiveSuccesses: number;
  lastResult?: TrialResult;
};

// État complet de l'exercice
export type ExerciseState = {
  // Phase actuelle
  phase: ExercisePhase;

  // Niveau (nombre d'éléments à mémoriser)
  level: number;

  // Séquences
  currentSequence: Position[];
  userSequence: Position[];

  // Résultats
  currentResult?: TrialResult;
  performanceHistory: PerformanceHistory;

  // État UI
  isLoading: boolean;
  messages: Message[];

  // Contrôle
  canStop: boolean;
  canClearSelection: boolean;
};

// Action pour le feedback (quel bouton afficher)
export type FeedbackAction = 'next_level' | 'retry' | 'maintain';

// Feedback généré
export type FeedbackResponse = {
  message: string;
  action: FeedbackAction;
  explanation?: string;
};

// Props des composants
export type NeuronProps = {
  position: Position;
  state: NeuronState;
  onClick: (position: Position) => void;
  disabled?: boolean;
};

export type NeuralNetworkProps = {
  sequence: Position[];
  userSequence: Position[];
  phase: ExercisePhase;
  onNeuronClick: (position: Position) => void;
  encodingIndex?: number;
};
