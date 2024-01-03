import Input from "../../../../../components/Input/Input.tsx";
import { useRef, useState } from "react";
import { validateEmail, validatePasswords } from "../formValidation.ts";
import styled from "styled-components";
import { TSignUpFormValidated } from "../types.ts";
import { validateStringInput } from "../../../../../utils/validators.ts";
import { getValueFromInputRef } from "../../../../../utils/input.ts";

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
  const [validatedForm, setValidatedForm] = useState<TSignUpFormValidated>({
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
    firstName: true,
    lastName: true,
  });

  const onSubmit = () => {
    const formData = {
      username: getValueFromInputRef(usernameRef),
      password: getValueFromInputRef(passwordRef),
      confirmPassword: getValueFromInputRef(confirmPasswordRef),
      email: getValueFromInputRef(emailRef),
      firstName: getValueFromInputRef(firstNameRef),
      lastName: getValueFromInputRef(lastNameRef),
    };
    console.log(formData);
  };

  return (
    <SignUpFormContainer data-testid="SignUpFormContainer">
      <Input
        ref={usernameRef}
        label="Username"
        type="text"
        placeholder="Username"
        isRequired
        validated={validatedForm.username}
        onChange={() => setValidatedForm({ ...validatedForm, username: validateStringInput(getValueFromInputRef(usernameRef)) })}
        inputKey="sign-up-username"
      />
      <Input
        ref={passwordRef}
        label="Password"
        type="password"
        placeholder="Password"
        isRequired
        validated={validatedForm.password && validatePasswords(getValueFromInputRef(passwordRef), getValueFromInputRef(confirmPasswordRef))}
        onChange={() => setValidatedForm({ ...validatedForm, password: validateStringInput(getValueFromInputRef(passwordRef)) })}
        inputKey="sign-up-password"
      />
      <Input
        ref={confirmPasswordRef}
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        isRequired
        validated={
          validatedForm.confirmPassword && validatePasswords(getValueFromInputRef(passwordRef), getValueFromInputRef(confirmPasswordRef))
        }
        onChange={() =>
          setValidatedForm({ ...validatedForm, confirmPassword: validateStringInput(getValueFromInputRef(confirmPasswordRef)) })
        }
        inputKey="sign-up-confirmPassword"
      />
      <Input
        ref={emailRef}
        label="E-mail"
        type="text"
        placeholder="name@company.com"
        isRequired
        validated={validatedForm.email && validateEmail(getValueFromInputRef(emailRef))}
        onChange={() => setValidatedForm({ ...validatedForm, email: validateStringInput(getValueFromInputRef(emailRef)) })}
        inputKey="sign-up-email"
      />
      <Input
        ref={firstNameRef}
        label="First name"
        type="text"
        placeholder="First Name"
        validated
        onChange={() => setValidatedForm({ ...validatedForm, firstName: validateStringInput(getValueFromInputRef(firstNameRef)) })}
        inputKey="sign-up-firstName"
      />
      <Input
        ref={lastNameRef}
        label="Last name"
        type="text"
        placeholder="Last Name"
        validated
        onChange={() => setValidatedForm({ ...validatedForm, lastName: validateStringInput(getValueFromInputRef(lastNameRef)) })}
        inputKey="sign-up-lastName"
      />
      <button className="primary-btn" onClick={onSubmit}>
        Sign up
      </button>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
