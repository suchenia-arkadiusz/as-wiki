import { validateStringInput } from '../../src/utils/validators.ts';

describe('validators', () => {
  describe('validateStringInput', () => {
    it('should return false for empty string', () => {
      expect(validateStringInput('')).toBe(false);
    });
    it('should return false for undefined', () => {
      expect(validateStringInput(undefined)).toBe(false);
    });
    it('should return false for null', () => {
      expect(validateStringInput(null)).toBe(false);
    });
    it('should return true for non-empty string', () => {
      expect(validateStringInput('test')).toBe(true);
    });
  });
});
