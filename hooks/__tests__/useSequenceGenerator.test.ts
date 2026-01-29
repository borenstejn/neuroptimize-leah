/**
 * Tests unitaires pour useSequenceGenerator
 * Neuroptimize POC v5.3 - Ticket #25
 */

import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSequenceGenerator, isSamePosition, isValidPosition } from '../useSequenceGenerator';
import { GRID_SIZE } from '@/lib/constants';
import type { Position } from '@/types/exercise';

describe('useSequenceGenerator', () => {
  it('should generate a sequence with the correct length', () => {
    const { result } = renderHook(() => useSequenceGenerator(5));
    expect(result.current).toHaveLength(5);
  });

  it('should generate sequences of different lengths', () => {
    const { result: result3 } = renderHook(() => useSequenceGenerator(3));
    const { result: result7 } = renderHook(() => useSequenceGenerator(7));
    const { result: result12 } = renderHook(() => useSequenceGenerator(12));

    expect(result3.current).toHaveLength(3);
    expect(result7.current).toHaveLength(7);
    expect(result12.current).toHaveLength(12);
  });

  it('should generate positions within the grid bounds (0-3)', () => {
    const { result } = renderHook(() => useSequenceGenerator(10));

    result.current.forEach((pos) => {
      expect(pos.row).toBeGreaterThanOrEqual(0);
      expect(pos.row).toBeLessThan(GRID_SIZE);
      expect(pos.col).toBeGreaterThanOrEqual(0);
      expect(pos.col).toBeLessThan(GRID_SIZE);
    });
  });

  it('should not have consecutive duplicate positions', () => {
    const { result } = renderHook(() => useSequenceGenerator(10));

    for (let i = 0; i < result.current.length - 1; i++) {
      const current = result.current[i];
      const next = result.current[i + 1];

      const isDuplicate = current.row === next.row && current.col === next.col;
      expect(isDuplicate).toBe(false);
    }
  });

  it('should generate different sequences on multiple calls (randomness)', () => {
    const { result: result1 } = renderHook(() => useSequenceGenerator(8));
    const { result: result2 } = renderHook(() => useSequenceGenerator(8));
    const { result: result3 } = renderHook(() => useSequenceGenerator(8));

    // Au moins une des séquences devrait être différente
    const sequence1Str = JSON.stringify(result1.current);
    const sequence2Str = JSON.stringify(result2.current);
    const sequence3Str = JSON.stringify(result3.current);

    const allSame =
      sequence1Str === sequence2Str &&
      sequence2Str === sequence3Str;

    expect(allSame).toBe(false);
  });

  it('should return an empty array for invalid levels', () => {
    const { result: result0 } = renderHook(() => useSequenceGenerator(0));
    const { result: resultNeg } = renderHook(() => useSequenceGenerator(-1));

    expect(result0.current).toHaveLength(0);
    expect(resultNeg.current).toHaveLength(0);
  });

  it('should memoize the sequence when level does not change', () => {
    const { result, rerender } = renderHook(
      ({ level }) => useSequenceGenerator(level),
      { initialProps: { level: 5 } }
    );

    const firstSequence = result.current;

    // Re-render avec le même level
    rerender({ level: 5 });

    // La séquence devrait être la même instance (memoization)
    expect(result.current).toBe(firstSequence);
  });

  it('should generate a new sequence when level changes', () => {
    const { result, rerender } = renderHook(
      ({ level }) => useSequenceGenerator(level),
      { initialProps: { level: 5 } }
    );

    const firstSequence = result.current;

    // Re-render avec un level différent
    rerender({ level: 6 });

    // La séquence devrait être différente
    expect(result.current).not.toBe(firstSequence);
    expect(result.current).toHaveLength(6);
  });
});

describe('isSamePosition', () => {
  it('should return true for identical positions', () => {
    const pos1: Position = { row: 2, col: 3 };
    const pos2: Position = { row: 2, col: 3 };

    expect(isSamePosition(pos1, pos2)).toBe(true);
  });

  it('should return false for different positions', () => {
    const pos1: Position = { row: 2, col: 3 };
    const pos2: Position = { row: 2, col: 2 };
    const pos3: Position = { row: 1, col: 3 };

    expect(isSamePosition(pos1, pos2)).toBe(false);
    expect(isSamePosition(pos1, pos3)).toBe(false);
  });
});

describe('isValidPosition', () => {
  it('should return true for valid positions within the grid', () => {
    expect(isValidPosition({ row: 0, col: 0 })).toBe(true);
    expect(isValidPosition({ row: 3, col: 3 })).toBe(true);
    expect(isValidPosition({ row: 1, col: 2 })).toBe(true);
  });

  it('should return false for positions outside the grid', () => {
    expect(isValidPosition({ row: -1, col: 2 })).toBe(false);
    expect(isValidPosition({ row: 2, col: -1 })).toBe(false);
    expect(isValidPosition({ row: 4, col: 2 })).toBe(false);
    expect(isValidPosition({ row: 2, col: 4 })).toBe(false);
    expect(isValidPosition({ row: 5, col: 5 })).toBe(false);
  });
});
