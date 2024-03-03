import styled from 'styled-components';
import Input from '../../../../../components/Input/Input.tsx';
import { useRef, useState } from 'react';
import { type SignInFormValidated } from '../types.ts';
import { validateStringInput } from '../../../../../utils/validators.ts';
import Button from '../../../../../components/Button/Button.tsx';
import { useAuthContext } from '../../../../../contexts/AuthContext.tsx';

const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  height: 100%;
  align-self: center;
`;

const SignInForm = () => {
  const {login} = useAuthContext();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [validatedForm, setValidatedForm] = useState<SignInFormValidated>({
    username: false,
    password: false,
  });

  const onSubmit = async () => {
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    login(username, password);
  };

  return (
    <SignInFormContainer
      data-testid="SignInFormContainer"
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          await onSubmit();
        }
      }}
    >
      <Input
        data-testid='SignInForm.username'
        ref={usernameRef}
        label="Username"
        type="text"
        placeholder="Username"
        isRequired
        validated={validatedForm.username}
        onChange={() => {
          setValidatedForm({
            ...validatedForm,
            username: validateStringInput(usernameRef.current?.value || ''),
          });
        }}
        inputKey="sign-in-username"
      />
      <Input
        data-testid='SignInForm.password'
        ref={passwordRef}
        label="Password"
        type="password"
        placeholder="Password"
        isRequired
        validated={validatedForm.password}
        onChange={() => {
          setValidatedForm({
            ...validatedForm,
            password: validateStringInput(passwordRef.current?.value || ''),
          });
        }}
        inputKey="sign-in-password"
      />
      <Button onClick={onSubmit} text="Sign in"  data-testid='SignInForm.button'/>
    </SignInFormContainer>
  );
};

export default SignInForm;
