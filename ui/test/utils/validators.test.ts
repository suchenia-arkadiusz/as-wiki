import { validateEmail, validatePasswords, validateStringInput } from '../../src/utils/validators.ts';

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

  describe('validatePasswords', () => {
    it('should return true if the password are identical', () => {
      expect(validatePasswords('password', 'password')).toBe(true);
    });

    it('should return false if the password are different', () => {
      expect(validatePasswords('password', 'password2')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should return true if the email is valid', () => {
      expect(validateEmail('a@a.com')).toBe(true);
    });

    it('should return false if the domain is missing in the email', () => {
      expect(validateEmail('a@.com')).toBe(false);
    });

    it('should return false if the domain\'s extension is missing in the email', () => {
      expect(validateEmail('a@a')).toBe(false);
    });

    it('should return false if the email is missing the @', () => {
      expect(validateEmail('a.com')).toBe(false);
    });

    it('should return false if the email is missing the domain', () => {
      expect(validateEmail('a@')).toBe(false);
    });

    it('should return false if the email is missing the username', () => {
      expect(validateEmail('@a.com')).toBe(false);
    });
  });
});
