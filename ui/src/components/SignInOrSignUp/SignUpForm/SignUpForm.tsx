import Input from "../../Input/Input.tsx";
import React, { useState } from "react";
import { validateEmail, validateSignUpForm, validatePasswords } from "../formValidation.ts";
import styled from "styled-components";
import { TSignUpForm, TSignUpFormValidated } from "../types.ts";

const SignUpFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  width: 100%;
  height: 100%;
`;

const SignUpForm = () => {
  const [formData, setFormData] = useState<TSignUpForm>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [validatedData, setValidatedData] = useState<TSignUpFormValidated>({
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    firstName: true,
    lastName: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, property: string) => {
    event.preventDefault();
    const value = event.target.value;
    const newState = { ...formData, [property]: value };

    setValidatedData(validateSignUpForm(newState));
    setFormData(newState);
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <SignUpFormContainer>
      <Input
        label="Username"
        type="text"
        value={formData.username}
        placeholder="Username"
        isRequired
        validated={validatedData["username"]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "username")}
        inputKey="sign-up-username"
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        placeholder="Password"
        isRequired
        validated={validatedData["password"] && validatePasswords(formData.password, formData.confirmPassword)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "password")}
        inputKey="sign-up-password"
      />
      <Input
        label="Confirm password"
        type="password"
        value={formData.confirmPassword}
        placeholder="Confirm password"
        isRequired
        validated={validatedData["confirmPassword"] && validatePasswords(formData.password, formData.confirmPassword)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "confirmPassword")}
        inputKey="sign-up-confirmPassword"
      />
      <Input
        label="E-mail"
        type="text"
        value={formData.email}
        placeholder="name@company.com"
        isRequired
        validated={validatedData["email"] && validateEmail(formData.email)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "email")}
        inputKey="sign-up-email"
      />
      <Input
        label="First name"
        type="text"
        value={formData.firstName}
        placeholder="First Name"
        validated
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "firstName")}
        inputKey="sign-up-firstName"
      />
      <Input
        label="Last name"
        type="text"
        value={formData.lastName}
        placeholder="Last Name"
        validated
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "lastName")}
        inputKey="sign-up-lastName"
      />
      <button className="primary-btn" onClick={onSubmit}>
        Sign up
      </button>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
