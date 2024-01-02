import Card from "../../../src/components/Card/Card.tsx";
import { render } from "@testing-library/react";
import { ReactNode } from "react";

const setupScreen = (isCenter: boolean = false, children: ReactNode | undefined = undefined) => {
  return render(<Card isCenter={isCenter}>{children}</Card>);
};

describe("<Card />", () => {
  it("should render CardContainer.center", () => {
    const screen = setupScreen(true);
    expect(screen.getByTestId("CardContainer.center")).toBeInTheDocument();
  });

  it("should render CardContainer.normal", () => {
    const screen = setupScreen();
    expect(screen.getByTestId("CardContainer.normal")).toBeInTheDocument();
  });

  it("should render CardContainer.normal with children", () => {
    const screen = setupScreen(false, <div>Some children</div>);
    expect(screen.getByTestId("CardContainer.normal")).toBeInTheDocument();
    expect(screen.queryByText("Some children")).toBeInTheDocument();
  });

  it("should render CardContainer.center with children", () => {
    const screen = setupScreen(true, <div>Some children</div>);
    expect(screen.getByTestId("CardContainer.center")).toBeInTheDocument();
    expect(screen.queryByText("Some children")).toBeInTheDocument();
  });
});
