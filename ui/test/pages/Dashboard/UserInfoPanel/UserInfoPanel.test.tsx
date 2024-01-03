import { render, within } from "@testing-library/react";
import MockBrowser from "../../../mocks/MockBrowser.tsx";
import UserInfoPanel from "../../../../src/pages/Dashboard/components/UserInfoPanel/UserInfoPanel.tsx";

const setupScreen = () => {
  return render(
    <MockBrowser>
      <UserInfoPanel />
    </MockBrowser>,
  );
};

describe("<UserInfoPanel />", () => {
  it("should render the component", () => {
    const screen = setupScreen();
    const container = screen.getByTestId("UserInfoPanelContainer");
    expect(container).toBeInTheDocument();
    expect(container.children).toHaveLength(4);
    expect(within(container).getByText("User info")).toBeInTheDocument();
    expect(within(container).getByAltText("User's avatar")).toBeInTheDocument();
    expect(within(container).getByText("Test User")).toBeInTheDocument();
    expect(within(container).getByText("test@test.com")).toBeInTheDocument();
  });
});
