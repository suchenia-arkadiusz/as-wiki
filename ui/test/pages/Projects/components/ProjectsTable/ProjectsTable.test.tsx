import { render } from "@testing-library/react";
import ProjectsTable from "../../../../../src/pages/Projects/components/ProjectsTable/ProjectsTable.tsx";
import MockBrowser from "../../../../mocks/MockBrowser.tsx";

const setupScreen = () => {
  return render(
    <MockBrowser>
      <ProjectsTable />
    </MockBrowser>,
  );
};

describe("<ProjectsTable />", () => {
  it("should render the component", async () => {
    const screen = setupScreen();

    expect(screen.getByTestId("ProjectsTable.container")).toBeInTheDocument();
    expect(screen.getByTestId("ProjectsTable.table.header")).toBeInTheDocument();
    const rows = await screen.findAllByTestId("ProjectsTable.table.row");
    console.log(rows);
  });
});
