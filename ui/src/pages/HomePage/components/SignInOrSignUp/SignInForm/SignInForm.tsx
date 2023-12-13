import styled from "styled-components";
import Input from "../../../../../components/Input/Input.tsx";
import { useContext, useRef, useState } from "react";
import { TSignInFormValidated } from "../types.ts";
import { UserContext } from "../../../../../contexts/UserContext.tsx";
import { useNavigate } from "react-router-dom";
import { validateStringInput } from "../../../../../utils/validators.ts";
import Button from "../../../../../components/Button/Button.tsx";

const SignInFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  height: 100%;
  align-self: center;
`;

const SignInForm = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [validatedForm, setValidatedForm] = useState<TSignInFormValidated>({
    username: false,
    password: false,
  });

  const onSubmit = () => {
    userContext?.setUser({
      username: "aru",
      password: "somePassword",
      email: "a@a.com",
      firstName: "Arek",
      lastName: "Suchenia",
      avatarUrl: undefined,
    });
    navigate("/dashboard", { replace: true });
  };

  return (
    <SignInFormContainer>
      <Input
        ref={usernameRef}
        label="Username"
        type="text"
        placeholder="Username"
        isRequired
        validated={validatedForm.username}
        onChange={() =>
          setValidatedForm({
            ...validatedForm,
            username: validateStringInput(usernameRef.current?.value || ""),
          })
        }
        inputKey="sign-in-username"
      />
      <Input
        ref={passwordRef}
        label="Password"
        type="password"
        placeholder="Password"
        isRequired
        validated={validatedForm.password}
        onChange={() =>
          setValidatedForm({
            ...validatedForm,
            password: validateStringInput(passwordRef.current?.value || ""),
          })
        }
        inputKey="sign-in-password"
      />
      <Button onClick={onSubmit} text="Sign in" />
    </SignInFormContainer>
  );
};

export default SignInForm;
