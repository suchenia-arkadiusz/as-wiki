import { fireEvent, render } from "@testing-library/react";
import TextArea from "../../../src/components/TextArea/TextArea.tsx";
import { expect, vi } from "vitest";

const setupScreen = (
  onChange: () => void = () => {},
  label: string = "textarea label",
  validated: boolean = true,
  inputKey: string | undefined = undefined,
) => {
  return render(<TextArea label={label} validated={validated} inputKey={inputKey} onChange={onChange} />);
};

describe("<TextArea />", () => {
  it("should render TextAreaContainer", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("TextAreaContainer")).toBeInTheDocument();
    expect(screen.getByTestId("TextAreaContainer.textarea")).toBeInTheDocument();
    expect(screen.getByTestId("TextAreaContainer.label")).toBeInTheDocument();
  });

  it("should render TextAreaContainer not validated", () => {
    const screen = setupScreen(() => {}, "textarea label", false);
    expect(screen.getByTestId("TextAreaContainer")).toBeInTheDocument();
    expect(screen.getByTestId("TextAreaContainer.textarea")).toHaveClass("app-textarea-not-validated");
  });

  it("should render TextAreaContainer with label", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("TextAreaContainer")).toBeInTheDocument();
    expect(screen.getByTestId("TextAreaContainer.label")).toHaveTextContent("textarea label");
  });

  it("should render TextAreaContainer and change the value", () => {
    const onChange = vi.fn();
    const screen = setupScreen(onChange);
    const textArea = screen.getByTestId("TextAreaContainer.textarea");
    expect(screen.getByTestId("TextAreaContainer")).toBeInTheDocument();
    expect(textArea).toHaveValue("");
    textArea.focus();
    fireEvent.change(textArea, { target: { value: "test value" } });
    expect(onChange).toHaveBeenCalled();
    expect(textArea).toHaveValue("test value");
  });
});
