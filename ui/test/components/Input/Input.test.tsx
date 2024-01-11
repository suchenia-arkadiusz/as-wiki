import Input from "../../../src/components/Input/Input";
import { fireEvent, render } from "@testing-library/react";
import { expect, vi } from "vitest";

const setupScreen = (
  label: string = "input label",
  validated: boolean = true,
  inputKey: string | undefined = undefined,
  type: string = "text",
  isRequired: boolean = false,
  onChange: () => void = () => {},
  placeholder: string = "placeholder",
) => {
  return render(
    <Input
      label={label}
      validated={validated}
      inputKey={inputKey}
      type={type}
      onChange={onChange}
      isRequired={isRequired}
      placeholder={placeholder}
    />,
  );
};

describe("<Input />", () => {
  it("should render InputContainer", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("InputContainer")).toBeInTheDocument();
  });

  it("should render InputContainer with label", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("InputContainer.label")).toBeInTheDocument();
    expect(screen.getByTestId("InputContainer.label")).toHaveTextContent("input label");
  });

  it("should render InputContainer with input", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
  });

  it("should render InputContainer with input and not validated", () => {
    const screen = setupScreen("input label", false);
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    expect(screen.getByTestId("InputContainer.input")).toHaveClass("app-input-not-validated");
  });

  it("should render InputContainer with input and validated", () => {
    const screen = setupScreen("input label", false);
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    expect(screen.getByTestId("InputContainer.input")).toHaveClass("app-text-input");
  });

  it("should render InputContainer with input and type", () => {
    const screen = setupScreen("input label", false, undefined, "password");
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    expect(screen.getByTestId("InputContainer.input")).toHaveAttribute("type", "password");
  });

  it("should render InputContainer with input and isRequired", () => {
    const screen = setupScreen("input label", false, undefined, "password", true);
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    expect(screen.getByTestId("InputContainer.label")).toHaveTextContent("input label *");
  });

  it("should render InputContainer with input and inputKey", () => {
    const screen = setupScreen("input label", false, "inputKey", "password", true, () => {});
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    expect(screen.getByTestId("InputContainer.input")).toHaveAttribute("id", "inputKey");
  });

  it("should render InputContainer with input and placeholder", () => {
    const screen = setupScreen("input label", false, "inputKey", "password", true, () => {});
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("placeholder")).toBeInTheDocument();
  });

  it("should render InputContainer and change the value", () => {
    const onChange = vi.fn();
    const screen = setupScreen("input label", false, "inputKey", "password", true, onChange);
    expect(screen.getByTestId("InputContainer.input")).toBeInTheDocument();
    screen.getByTestId("InputContainer.input").focus();
    fireEvent.change(screen.getByTestId("InputContainer.input"), { target: { value: "some value" } });
    screen.getByTestId("InputContainer.input").blur();
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByTestId("InputContainer.input")).toHaveValue("some value");
  });
});
