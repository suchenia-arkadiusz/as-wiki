import { render } from "@testing-library/react";
import { Toaster } from "../../../src/components/Toaster/Toaster.tsx";

const setupScreen = (message: string, type: "DANGER" | "SUCCESS" | "ERROR") => {
  return render(<Toaster message={message} type={type} />);
};

describe("<Toaster />", () => {
  it("should render the component with the DANGER style", () => {
    const screen = setupScreen("test message", "DANGER");
    expect(screen.getByTestId("Toaster.container")).toBeInTheDocument();
    expect(screen.getByText("test message")).toBeInTheDocument();
    expect(screen.getByTestId("Toaster.container")).toHaveStyle("background-color: #ff7826");
    expect(screen.getByTestId("Toaster.container")).toHaveStyle("color: #000000");
    expect(screen.getByTestId("IconContainer")).toBeInTheDocument();
    expect(screen.getByTestId("IconContainer")).toHaveClass("bi-exclamation-triangle");
  });

  it("should render the component", () => {
    const screen = setupScreen("test message", "SUCCESS");
    expect(screen.getByTestId("Toaster.container")).toBeInTheDocument();
    expect(screen.getByText("test message")).toBeInTheDocument();
    expect(screen.getByTestId("Toaster.container")).toHaveStyle("background-color: #61ff61");
    expect(screen.getByTestId("Toaster.container")).toHaveStyle("color: #000000");
    expect(screen.getByTestId("IconContainer")).toBeInTheDocument();
    expect(screen.getByTestId("IconContainer")).toHaveClass("bi-check-circle");
  });

  it("should render the component", () => {
    const screen = setupScreen("test message", "ERROR");
    expect(screen.getByTestId("Toaster.container")).toBeInTheDocument();
    expect(screen.getByText("test message")).toBeInTheDocument();
    expect(screen.getByTestId("Toaster.container")).toHaveStyle("background-color: #ff4a4a");
    expect(screen.getByTestId("Toaster.container")).toHaveStyle("color: #ffffff");
    expect(screen.getByTestId("IconContainer")).toBeInTheDocument();
    expect(screen.getByTestId("IconContainer")).toHaveClass("bi-exclamation-circle");
  });
});
