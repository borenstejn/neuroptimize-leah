/**
 * Tests unitaires pour le système de feedback
 * Neuroptimize POC v5.3 - Ticket #4
 */

import { describe, it, expect } from 'vitest';
import { generateFeedback, generateFallbackFeedback } from '../feedback';

describe('generateFeedback', () => {
  describe('Succès complet (100%)', () => {
    it('should return next_level action for 100% score with level up', () => {
      const result = generateFeedback(100, 5, 5, 5, true, false);

      expect(result.action).toBe('next_level');
      expect(result.message).toContain('5');
      expect(result.message).toContain('niveau 6');
    });

    it('should return maintain action for 100% score without level up', () => {
      const result = generateFeedback(100, 5, 5, 5, false, false);

      expect(result.action).toBe('maintain');
      expect(result.message).toContain('5');
    });

    it('should include neuroscience explanation', () => {
      const result = generateFeedback(100, 5, 5, 5, false, false);

      expect(result.message.toLowerCase()).toMatch(/hippocampe|mémoire/);
      expect(result.explanation).toBeDefined();
    });
  });

  describe('Succès partiel (60-99%)', () => {
    it('should return maintain action for 70% score', () => {
      const result = generateFeedback(70, 5, 3, 5, false, false);

      expect(result.action).toBe('maintain');
      expect(result.message).toContain('3');
      expect(result.message).toContain('5');
    });

    it('should return next_level for partial success with level up', () => {
      const result = generateFeedback(80, 5, 4, 5, true, false);

      expect(result.action).toBe('next_level');
      expect(result.message).toContain('niveau 6');
    });

    it('should return retry for partial success with level down', () => {
      const result = generateFeedback(65, 5, 3, 5, false, true);

      expect(result.action).toBe('retry');
      expect(result.message).toContain('niveau 4');
    });

    it('should include score information in message', () => {
      const result = generateFeedback(75, 5, 3, 5, false, false);

      // Le message devrait contenir soit le pourcentage, soit le ratio
      expect(result.message).toMatch(/75|3.*5/);
    });
  });

  describe('Échec (<60%)', () => {
    it('should return retry action for failure', () => {
      const result = generateFeedback(40, 5, 2, 5, false, false);

      expect(result.action).toBe('retry');
      expect(result.message).toContain('2');
      expect(result.message).toContain('5');
    });

    it('should have normalizing tone for failure', () => {
      const result = generateFeedback(20, 5, 1, 5, false, false);

      // Vérifie qu'il y a un ton empathique/normalisateur (différentes variations possibles)
      expect(result.message.toLowerCase()).toMatch(/normal|muscle|progressivement|souci|difficulté|zone de confort/);
    });

    it('should mention level down when applicable', () => {
      const result = generateFeedback(30, 5, 1, 5, false, true);

      expect(result.message).toContain('niveau 4');
    });

    it('should include neuroscience explanation for failure', () => {
      const result = generateFeedback(25, 5, 1, 5, false, false);

      expect(result.explanation).toBeDefined();
      // L'explication peut mentionner différents concepts neuroscientifiques
      expect(result.explanation?.toLowerCase()).toMatch(/hippocampe|neuroplasticité|cerveau|mémoire|muscle/);
    });
  });

  describe('Edge cases', () => {
    it('should handle 0% score', () => {
      const result = generateFeedback(0, 5, 0, 5, false, true);

      expect(result.action).toBe('retry');
      expect(result.message).toContain('0');
      expect(result.message).toContain('5');
    });

    it('should handle 60% score (boundary)', () => {
      const result = generateFeedback(60, 5, 3, 5, false, false);

      expect(result.action).toBe('maintain');
      expect(result.message).toContain('3');
    });

    it('should handle 59% score (boundary)', () => {
      const result = generateFeedback(59, 5, 2, 5, false, false);

      expect(result.action).toBe('retry');
      expect(result.message).toContain('2');
    });
  });

  describe('Variation', () => {
    it('should generate different messages for same score (randomness)', () => {
      const results = new Set();

      for (let i = 0; i < 10; i++) {
        const result = generateFeedback(100, 5, 5, 5, false, false);
        results.add(result.message);
      }

      // Au moins 2 variations différentes devraient apparaître
      expect(results.size).toBeGreaterThan(1);
    });
  });
});

describe('generateFallbackFeedback', () => {
  it('should return valid feedback with maintain action', () => {
    const result = generateFallbackFeedback(75, 3, 4);

    expect(result.action).toBe('maintain');
    expect(result.message).toContain('3');
    expect(result.message).toContain('4');
    expect(result.message).toContain('75');
  });

  it('should work with any score', () => {
    const result1 = generateFallbackFeedback(0, 0, 5);
    const result2 = generateFallbackFeedback(100, 5, 5);

    expect(result1.message).toBeDefined();
    expect(result2.message).toBeDefined();
  });
});
