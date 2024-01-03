import { render, within } from "@testing-library/react";
import CreateProjectPopup from "../../../../../src/pages/Projects/components/CreateProjectPopup/CreateProjectPopup.tsx";

const onClose = jest.fn();

const setupScreen = () => {
  return render(<CreateProjectPopup onClose={onClose} />);
};

describe("<CreateProjectPopup />", () => {
  it("should render the component", () => {
    const screen = setupScreen();

    expect(screen.getByTestId("CreateProject.container")).toBeInTheDocument();
    expect(screen.getByTestId("CreateProject.button.container")).toBeInTheDocument();
  });

  it("show render the form", () => {
    const screen = setupScreen();
    const formContainer = screen.getByTestId("CreateProject.container");
    const buttonContainer = screen.getByTestId("CreateProject.button.container");

    expect(within(formContainer).getByText("Name *")).toBeInTheDocument();
    expect(within(formContainer).getByText("Description *")).toBeInTheDocument();
    expect(within(buttonContainer).getByText("Save")).toBeInTheDocument();
    expect(within(within(buttonContainer).getByText("Save")).getByTestId("IconContainer")).toHaveClass("bi-floppy");
  });
});
