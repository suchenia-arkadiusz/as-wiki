import { TSignInForm, TSignInFormValidated, TSignUpForm, TSignUpFormValidated } from "./types.ts";

export const validateSignUpForm = (formData: TSignUpForm): TSignUpFormValidated => ({
  username: validateField(formData.username),
  password: validateField(formData.password),
  confirmPassword: validateField(formData.confirmPassword),
  email: validateField(formData.email),
  firstName: validateField(formData.firstName),
  lastName: validateField(formData.lastName),
});

export const validateSignInForm = (formData: TSignInForm): TSignInFormValidated => ({
  username: validateField(formData.username),
  password: validateField(formData.password),
});

const validateField = (value: string | undefined): boolean => !!value && value.length > 0;
export const validatePasswords = (password: string, confirmPassword: string): boolean => password === confirmPassword;

export const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
