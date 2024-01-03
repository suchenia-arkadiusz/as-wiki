import SignUpForm from "./SignUpForm/SignUpForm.tsx";
import SignInForm from "./SignInForm/SignInForm.tsx";
import styled from "styled-components";

const SignInOrSignUpContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  gap: 50px;
`;

const SignInOrSignUp = () => {
  return (
    <SignInOrSignUpContainer data-testid="SignInOrSignUpContainer">
      <SignUpForm />
      <SignInForm />
    </SignInOrSignUpContainer>
  );
};

export default SignInOrSignUp;
