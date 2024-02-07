import styled from 'styled-components';
import Input from '../../../../../components/Input/Input.tsx';
import { useRef, useState } from 'react';
import { type SignInFormValidated } from '../types.ts';
import { useUserContext } from '../../../../../contexts/UserContext.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateStringInput } from '../../../../../utils/validators.ts';
import Button from '../../../../../components/Button/Button.tsx';
import { useRestApiContext } from '../../../../../contexts/RestApiContext.tsx';
import { useToasterContext } from '../../../../../contexts/ToasterContext.tsx';

const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  height: 100%;
  align-self: center;
`;

const SignInForm = () => {
  const api = useRestApiContext();
  const navigate = useNavigate();
  const userContext = useUserContext();
  const toasterContext = useToasterContext();
  const location = useLocation();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [validatedForm, setValidatedForm] = useState<SignInFormValidated>({
    username: false,
    password: false,
  });

  const onSubmit = async () => {
    const username = usernameRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    const response = await api.post('/login', { username, password });

    if (response.status === 401) {
      toasterContext.addToast('Wrong username or password!', 'ERROR');
    }

    if (response.status === 200) {
      const data = await response.json();
      userContext.setUser(data.user);
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('refreshToken', data.refreshToken);
      toasterContext.addToast('Signed in successfully!', 'SUCCESS');
      if (location.state?.from) {
        navigate(location.state.from);
        return;
      }
      navigate('/dashboard');
    }
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
      <Button onClick={onSubmit} text="Sign in" />
    </SignInFormContainer>
  );
};

export default SignInForm;
