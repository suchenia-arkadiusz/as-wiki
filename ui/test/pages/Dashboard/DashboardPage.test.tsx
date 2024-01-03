import { render } from "@testing-library/react";
import DashboardPage from "../../../src/pages/Dashboard/DashboardPage.tsx";

const setupScreen = () => {
  return render(<DashboardPage />);
};

describe("<DashboardPage />", () => {
  it("should render the page", () => {
    const screen = setupScreen();

    expect(screen.getByTestId("DashboardPageContainer")).toBeInTheDocument();
    expect(screen.getByTestId("RecentlyViewedPanelContainer")).toBeInTheDocument();
    expect(screen.getByTestId("UserInfoPanelContainer")).toBeInTheDocument();
  });
});
