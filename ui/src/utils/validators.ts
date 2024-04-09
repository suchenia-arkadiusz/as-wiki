export const validateStringInput = (value: string | null | undefined): boolean => !!value && value.length > 0;

export const validatePasswords = (password: string, confirmPassword: string): boolean => password === confirmPassword;

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
