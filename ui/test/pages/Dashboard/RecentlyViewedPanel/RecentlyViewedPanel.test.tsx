import { render, within } from "@testing-library/react";
import RecentlyViewedPanel from "../../../../src/pages/Dashboard/components/RecentlyViewedPanel/RecentlyViewedPanel.tsx";
import MockBrowser from "../../../mocks/MockBrowser.tsx";

const setupScreen = () => {
  return render(
    <MockBrowser>
      <RecentlyViewedPanel />
    </MockBrowser>,
  );
};

describe("<RecentlyViewedPanel />", () => {
  it("should render the page", () => {
    const screen = setupScreen();

    expect(screen.getByTestId("RecentlyViewedPanelContainer")).toBeInTheDocument();
  });

  it("should render a list of recently viewed projects", () => {
    const screen = setupScreen();
    const container = screen.getByTestId("RecentlyViewedPanelContainer");

    expect(within(container).getAllByTestId("RecentlyViewedPageContainer")).toHaveLength(4);
  });

  it("should contain a page info", () => {
    const localeDateStringMock = jest.spyOn(Date.prototype, "toLocaleString").mockReturnValue("2024-01-01 10:00:00");
    const screen = setupScreen();

    const containers = screen.getAllByTestId("RecentlyViewedPageContainer");

    containers.forEach((container, index) => {
      const nameLine = within(container).getByTestId("RecentlyViewedPageContainer.name");
      expect(within(nameLine).getByText(`Page ${index + 1}`)).toBeInTheDocument();
      expect(within(nameLine).getByText("updated at 2024-01-01 10:00:00")).toBeInTheDocument();
      const modifiedLine = within(container).getByTestId("RecentlyViewedPageContainer.modifiedBy");
      expect(within(modifiedLine).getByText("Last modified by")).toBeInTheDocument();
      expect(within(modifiedLine).getByText(`Test User${index % 2 === 1 ? " 2" : ""}`)).toBeInTheDocument();
    });

    localeDateStringMock.mockRestore();
  });
});
