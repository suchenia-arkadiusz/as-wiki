import { validateEmail, validatePasswords } from '../../../../src/pages/HomePage/components/SignInOrSignUp/formValidation.ts';

describe('Test validators', () => {
  it('should return true if the password are identical', () => {
    expect(validatePasswords('password', 'password')).toBe(true);
  });

  it('should return false if the password are different', () => {
    expect(validatePasswords('password', 'password2')).toBe(false);
  });

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
