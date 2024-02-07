export type SignInFormValidated = {
  username: boolean;
  password: boolean;
};

export type SignUpFormValidated = {
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
  email: boolean;
  firstName: boolean;
  lastName: boolean;
};
