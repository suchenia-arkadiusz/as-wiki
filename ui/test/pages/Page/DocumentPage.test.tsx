import DocumentPage from "../../../src/pages/Page/DocumentPage.tsx";
import MockBrowser from "../../mocks/MockBrowser.tsx";
import { render } from "@testing-library/react";
import MockPagesContext from "../../mocks/contexts/MockPagesContext.tsx";

const setupScreen = (withPage: boolean = true) => {
  return render(
    <MockBrowser>
      <MockPagesContext withPage={withPage}>
        <DocumentPage />
      </MockPagesContext>
    </MockBrowser>
  );
}

describe('<DocumentPage />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('DocumentPage.container')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.pageContent.container.page')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.container')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.addPage.button')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.list-0')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.editPermissions.button')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.editPage.button')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.deletePage.button')).toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.pageContent.container.accessDenied')).not.toBeInTheDocument();
  });

  it('should render the "Access Denied" page when there is no page', () => {
    const screen = setupScreen(false);

    expect(screen.getByTestId('DocumentPage.container')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.pageContent.container.accessDenied')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.container')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.addPage.button')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.list-0')).toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.pageContent.container.page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.editPermissions.button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.editPage.button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.deletePage.button')).not.toBeInTheDocument();
  });

  it('should load page content when a page is selected', () => {

  });
});
