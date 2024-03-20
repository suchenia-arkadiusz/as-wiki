import Input from '../../../../../components/Input/Input.tsx';
import { useRef, useState } from 'react';
import { validateStringInput, validateEmail, validatePasswords } from '../../../../../utils/validators.ts';
import styled from 'styled-components';
import { type SignUpFormValidated } from '../types.ts';
import { getValueFromInputRef } from '../../../../../utils/input.ts';
import { useAuthContext } from '../../../../../contexts/AuthContext.tsx';
import Button from '../../../../../components/Button/Button.tsx';

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  height: 100%;
`;

const SignUpForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const { register } = useAuthContext();
  const [validatedForm, setValidatedForm] = useState<SignUpFormValidated>({
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    firstName: true,
    lastName: true,
  });

  const onSubmit = async () => {
    const body = {
      username: getValueFromInputRef(usernameRef),
      password: getValueFromInputRef(passwordRef),
      email: getValueFromInputRef(emailRef),
      firstName: getValueFromInputRef(firstNameRef),
      lastName: getValueFromInputRef(lastNameRef),
    };

    register(body);
  };

  return (
    <SignUpFormContainer
      data-testid="SignUpFormContainer"
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await onSubmit();
        }
      }}
    >
      <Input
        data-testid='SignUpForm.username'
        ref={usernameRef}
        label="Username"
        type="text"
        placeholder="Username"
        isRequired
        validated={validatedForm.username}
        onChange={() => {
          setValidatedForm({ ...validatedForm, username: validateStringInput(getValueFromInputRef(usernameRef)) });
        }}
        inputKey="sign-up-username"
      />
      <Input
        data-testid='SignUpForm.password'
        ref={passwordRef}
        label="Password"
        type="password"
        placeholder="Password"
        isRequired
        validated={validatedForm.password && validatePasswords(getValueFromInputRef(passwordRef), getValueFromInputRef(confirmPasswordRef))}
        onChange={() => {
          setValidatedForm({ ...validatedForm, password: validateStringInput(getValueFromInputRef(passwordRef)) });
        }}
        inputKey="sign-up-password"
      />
      <Input
        data-testid='SignUpForm.confirmPassword'
        ref={confirmPasswordRef}
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        isRequired
        validated={
          validatedForm.confirmPassword && validatePasswords(getValueFromInputRef(passwordRef), getValueFromInputRef(confirmPasswordRef))
        }
        onChange={() => {
          setValidatedForm({ ...validatedForm, confirmPassword: validateStringInput(getValueFromInputRef(confirmPasswordRef)) });
        }}
        inputKey="sign-up-confirmPassword"
      />
      <Input
        data-testid='SignUpForm.email'
        ref={emailRef}
        label="E-mail"
        type="text"
        placeholder="name@company.com"
        isRequired
        validated={validatedForm.email && validateEmail(getValueFromInputRef(emailRef))}
        onChange={() => {
          setValidatedForm({ ...validatedForm, email: validateStringInput(getValueFromInputRef(emailRef)) });
        }}
        inputKey="sign-up-email"
      />
      <Input
        data-testid='SignUpForm.firstName'
        ref={firstNameRef}
        label="First name"
        type="text"
        placeholder="First Name"
        validated
        onChange={() => {
          setValidatedForm({ ...validatedForm, firstName: validateStringInput(getValueFromInputRef(firstNameRef)) });
        }}
        inputKey="sign-up-firstName"
      />
      <Input
        data-testid='SignUpForm.lastName'
        ref={lastNameRef}
        label="Last name"
        type="text"
        placeholder="Last Name"
        validated
        onChange={() => {
          setValidatedForm({ ...validatedForm, lastName: validateStringInput(getValueFromInputRef(lastNameRef)) });
        }}
        inputKey="sign-up-lastName"
      />
      <Button text={'Sign up'} onClick={onSubmit} data-testid='SignUpForm.button' />
    </SignUpFormContainer>
  );
};

export default SignUpForm;
