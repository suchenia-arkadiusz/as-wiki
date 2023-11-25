import styled from "styled-components";
import Input from "../../Input/Input.tsx";
import { validateSignInForm } from "../formValidation.ts";
import React, { useContext, useState } from "react";
import { TSignInForm, TSignInFormValidated } from "../types.ts";
import { UserContext } from "../../../contexts/UserContext.tsx";
import { useNavigate } from "react-router-dom";

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
  const [formData, setFormData] = useState<TSignInForm>({
    username: "",
    password: "",
  });
  const [validatedData, setValidatedData] = useState<TSignInFormValidated>({
    username: false,
    password: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, property: string) => {
    event.preventDefault();
    const value: string = event.target.value;
    const newState: TSignInForm = { ...formData, [property]: value };

    setValidatedData(validateSignInForm(newState));
    setFormData(newState);
  };

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
        label="Username"
        type="text"
        value={formData.username}
        placeholder="Username"
        isRequired
        validated={validatedData["username"]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "username")}
        inputKey="sign-in-username"
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        placeholder="Password"
        isRequired
        validated={validatedData["password"]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "password")}
        inputKey="sign-in-password"
      />
      <button className="primary-btn" onClick={onSubmit}>
        Sign in
      </button>
    </SignInFormContainer>
  );
};

export default SignInForm;
