import { render } from "@testing-library/react";
import DashboardPage from "../../../src/pages/Dashboard/DashboardPage.tsx";
import MockBrowser from "../../mocks/MockBrowser.tsx";
import { expect } from "vitest";

const setupScreen = () => {
  return render(
    <MockBrowser>
      <DashboardPage />
    </MockBrowser>,
  );
};

describe("<DashboardPage />", () => {
  it("should render the page", () => {
    const screen = setupScreen();

    expect(screen.getByTestId("DashboardPageContainer")).toBeInTheDocument();
    expect(screen.getByTestId("RecentlyViewedPanelContainer")).toBeInTheDocument();
    expect(screen.getByTestId("UserInfoPanelContainer")).toBeInTheDocument();
  });
});
