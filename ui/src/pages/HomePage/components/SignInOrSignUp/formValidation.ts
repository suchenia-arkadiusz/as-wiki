export const validatePasswords = (password: string, confirmPassword: string): boolean => password === confirmPassword;

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
