/**
 * Système de feedback avec templating intelligent
 * Génère les réponses de Max selon le score, niveau et contexte
 * Neuroptimize POC v5.3 - Ticket #4
 */

import type { Position, FeedbackAction, FeedbackResponse } from '@/types/exercise';

/**
 * Génère un feedback personnalisé selon le score
 * @param score Score en pourcentage (0-100)
 * @param level Niveau actuel
 * @param correctCount Nombre d'éléments corrects
 * @param totalCount Nombre total d'éléments
 * @param isLevelUp Si le niveau va augmenter
 * @param isLevelDown Si le niveau va diminuer
 * @returns Objet FeedbackResponse avec message et action
 */
export function generateFeedback(
  score: number,
  level: number,
  correctCount: number,
  totalCount: number,
  isLevelUp: boolean,
  isLevelDown: boolean
): FeedbackResponse {
  // Succès complet (100%)
  if (score === 100) {
    return generateSuccessFeedback(level, totalCount, isLevelUp);
  }

  // Succès partiel (60-99%)
  if (score >= 60) {
    return generatePartialFeedback(
      score,
      level,
      correctCount,
      totalCount,
      isLevelUp,
      isLevelDown
    );
  }

  // Échec (<60%)
  return generateFailureFeedback(
    score,
    level,
    correctCount,
    totalCount,
    isLevelDown
  );
}

/**
 * Feedback pour succès complet (100%)
 */
function generateSuccessFeedback(
  level: number,
  totalCount: number,
  isLevelUp: boolean
): FeedbackResponse {
  const variations = [
    {
      message: `Excellent. Tu as reproduit la séquence sans erreur. L'hippocampe (centre de la mémoire) a parfaitement encodé les ${totalCount} positions spatiales.`,
      explanation:
        "Ton hippocampe a créé une trace mnésique solide. C'est exactement ce qu'on cherche à renforcer.",
    },
    {
      message: `Parfait ! Séquence complète reproduite. Ton hippocampe a parfaitement stocké les ${totalCount} éléments.`,
      explanation:
        'La mémoire de travail visuo-spatiale fonctionne à plein régime. Excellent travail.',
    },
    {
      message: `Bravo. ${totalCount} sur ${totalCount}, sans aucune erreur. Ta mémoire de travail est très performante ici.`,
      explanation:
        "L'information a été encodée, maintenue et rappelée avec précision. C'est la base d'une mémoire efficace.",
    },
  ];

  const selected = variations[Math.floor(Math.random() * variations.length)];

  let fullMessage = selected.message;

  if (isLevelUp) {
    fullMessage += ` Je passe au niveau ${level + 1}.`;
  }

  fullMessage += `\n\n${selected.explanation}`;

  return {
    message: fullMessage,
    action: isLevelUp ? 'next_level' : 'maintain',
    explanation: selected.explanation,
  };
}

/**
 * Feedback pour succès partiel (60-99%)
 */
function generatePartialFeedback(
  score: number,
  level: number,
  correctCount: number,
  totalCount: number,
  isLevelUp: boolean,
  isLevelDown: boolean
): FeedbackResponse {
  const variations = [
    {
      message: `Bien. Tu as mémorisé ${correctCount} sur ${totalCount} éléments (${score}%). La mémoire de travail se renforce avec la répétition.`,
      explanation: "Chaque essai, même imparfait, stimule l'hippocampe et renforce les circuits neuronaux.",
    },
    {
      message: `${correctCount} sur ${totalCount}, c'est un bon début. Tu as mémorisé ${score}% de la séquence.`,
      explanation:
        'La mémoire de travail a ses limites naturelles. Avec la pratique, ces limites peuvent progresser.',
    },
    {
      message: `Séquence partiellement reproduite : ${correctCount}/${totalCount}. La mémoire de travail est sollicitée, c'est l'objectif.`,
      explanation:
        "Le but n'est pas la perfection immédiate, mais la stimulation régulière des capacités cognitives.",
    },
  ];

  const selected = variations[Math.floor(Math.random() * variations.length)];

  let fullMessage = selected.message;

  if (isLevelUp) {
    fullMessage += ` On monte au niveau ${level + 1}.`;
  } else if (isLevelDown) {
    fullMessage += ` On ajuste au niveau ${level - 1} pour consolider.`;
  } else {
    fullMessage += ` On reste au niveau ${level}.`;
  }

  fullMessage += `\n\n${selected.explanation}`;

  return {
    message: fullMessage,
    action: isLevelUp ? 'next_level' : isLevelDown ? 'retry' : 'maintain',
    explanation: selected.explanation,
  };
}

/**
 * Feedback pour échec (<60%)
 */
function generateFailureFeedback(
  score: number,
  level: number,
  correctCount: number,
  totalCount: number,
  isLevelDown: boolean
): FeedbackResponse {
  const variations = [
    {
      message: `Tu as mémorisé ${correctCount} sur ${totalCount} (${score}%). C'est un point de départ tout à fait normal.`,
      explanation:
        "La mémoire de travail est comme un muscle : le but est de la stimuler progressivement, pas de la saturer. L'échec fait partie du processus d'apprentissage.",
    },
    {
      message: `${correctCount}/${totalCount}. Pas de souci, c'est justement en étant au niveau de difficulté où on échoue parfois qu'on progresse le plus.`,
      explanation:
        "L'hippocampe se renforce précisément quand il est challengé au-delà de sa zone de confort. Tu es exactement là où tu dois être.",
    },
    {
      message: `Séquence difficile : ${correctCount} sur ${totalCount}. C'est en travaillant à la limite de tes capacités que tu les étends.`,
      explanation:
        "La neuroplasticité (capacité du cerveau à se reconfigurer) s'active surtout quand on est en difficulté. Continue.",
    },
  ];

  const selected = variations[Math.floor(Math.random() * variations.length)];

  let fullMessage = selected.message;

  if (isLevelDown) {
    fullMessage += ` On descend au niveau ${level - 1} pour reconstruire une base solide.`;
  } else {
    fullMessage += ` On réessaye au même niveau.`;
  }

  fullMessage += `\n\n${selected.explanation}`;

  return {
    message: fullMessage,
    action: 'retry',
    explanation: selected.explanation,
  };
}

/**
 * Fallback en cas d'erreur
 */
export function generateFallbackFeedback(
  score: number,
  correctCount: number,
  totalCount: number
): FeedbackResponse {
  return {
    message: `Score : ${correctCount}/${totalCount} (${score}%). Continue, chaque essai compte.`,
    action: 'maintain',
  };
}
