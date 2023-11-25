export type TSignInForm = {
  username: string;
  password: string;
};

export type TSignInFormValidated = {
  username: boolean;
  password: boolean;
};

export type TSignUpForm = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type TSignUpFormValidated = {
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
  email: boolean;
  firstName: boolean;
  lastName: boolean;
};
