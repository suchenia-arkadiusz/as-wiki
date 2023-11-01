import Input from "../../../../components/Input/Input.tsx";
import { useState } from "react";
import { validateEmail, validateForm, validatePasswords } from "./formValidation.ts";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [validatedData, setValidatedData] = useState({
    username: true,
    password: true,
    confirmPassword: true,
    email: true,
    firstName: true,
    lastName: true,
  });

  const handleChange = (event, property) => {
    event.preventDefault();
    const value = event.target.value;
    const newState = { ...formData };
    newState[property] = value;

    setValidatedData(validateForm(newState));
    setFormData(newState);
  };

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="app-signup-page-form-container">
      <Input
        label="Username"
        type="text"
        value={formData.username}
        placeholder="Username"
        isRequired
        validated={validatedData["username"]}
        onChange={(e) => handleChange(e, "username")}
        inputKey="username"
      />
      <Input
        label="Password"
        type="password"
        value={formData.password}
        placeholder="Password"
        isRequired
        validated={validatedData["password"] && validatePasswords(formData.password, formData.confirmPassword)}
        onChange={(e) => handleChange(e, "password")}
        inputKey="password"
      />
      <Input
        label="Confirm password"
        type="password"
        value={formData.confirmPassword}
        placeholder="Confirm password"
        isRequired
        validated={validatedData["confirmPassword"] && validatePasswords(formData.password, formData.confirmPassword)}
        onChange={(e) => handleChange(e, "confirmPassword")}
        inputKey="confirmPassword"
      />
      <Input
        label="E-mail"
        type="text"
        value={formData.email}
        placeholder="name@company.com"
        isRequired
        validated={validatedData["email"] && validateEmail(formData.email)}
        onChange={(e) => handleChange(e, "email")}
        inputKey="email"
      />
      <Input
        label="First name"
        type="text"
        value={formData.firstName}
        placeholder="Jan"
        validated
        onChange={(e) => handleChange(e, "firstName")}
        inputKey="firstName"
      />
      <Input
        label="Last name"
        type="text"
        value={formData.lastName}
        placeholder="Kowalski"
        validated
        onChange={(e) => handleChange(e, "lastName")}
        inputKey="lastName"
      />
      <button className="app-signup-page-submit-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SignUpForm;
