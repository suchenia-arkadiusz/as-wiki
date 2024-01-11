import MockBrowser from "../../mocks/MockBrowser.tsx";
import HomePage from "../../../src/pages/HomePage/HomePage.tsx";
import { render } from "@testing-library/react";
import { expect } from "vitest";

const setupScreen = () => {
  return render(
    <MockBrowser>
      <HomePage />
    </MockBrowser>,
  );
};

describe("<HomePage />", () => {
  it("should render HomePageContainer", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("HomePageContainer")).toBeInTheDocument();
    expect(screen.getByTestId("SignInOrSignUpContainer")).toBeInTheDocument();
    expect(screen.getByTestId("SignInFormContainer")).toBeInTheDocument();
    expect(screen.getByTestId("SignUpFormContainer")).toBeInTheDocument();
  });
});
