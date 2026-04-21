import { describe, it, expect, vi } from 'vitest';
import { formatDuration, formatDateTab } from '../lib/helpers';

describe('Helper Functions', () => {
  describe('formatDuration', () => {
    it('formats duration under an hour', () => {
      const start = new Date('2026-01-01T10:00:00Z');
      const end = new Date('2026-01-01T10:45:00Z');
      expect(formatDuration(start, end)).toBe('45m');
    });

    it('formats duration exactly one hour', () => {
      const start = new Date('2026-01-01T10:00:00Z');
      const end = new Date('2026-01-01T11:00:00Z');
      expect(formatDuration(start, end)).toBe('1h');
    });

    it('formats duration over an hour', () => {
      const start = new Date('2026-01-01T10:00:00Z');
      const end = new Date('2026-01-01T11:30:00Z');
      expect(formatDuration(start, end)).toBe('1h 30m');
    });
  });

  describe('formatDateTab', () => {
    it('returns "Today" for the current date', () => {
      const today = new Date();
      const result = formatDateTab(today);
      expect(result.top).toBe('Today');
    });

    it('returns "Tomorrow" for the next date', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const result = formatDateTab(tomorrow);
      expect(result.top).toBe('Tomorrow');
    });
  });
});
