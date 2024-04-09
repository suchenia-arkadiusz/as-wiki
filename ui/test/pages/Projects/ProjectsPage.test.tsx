import { act, render } from '@testing-library/react';
import ProjectsPage from '../../../src/pages/Projects/ProjectsPage.tsx';
import MockBrowser from '../../mocks/MockBrowser.tsx';
import { expect } from 'vitest';

const setupScreen = () => {
  return render(
    <MockBrowser>
      <ProjectsPage />
    </MockBrowser>
  );
};

describe('<ProjectsPage />', () => {
  it('should render the page', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('ProjectsPage.container')).toBeInTheDocument();
    expect(screen.getByTestId('ProjectsPage.container.header')).toBeInTheDocument();
    expect(screen.getByTestId('ProjectsPage.container.header.title')).toBeInTheDocument();
    expect(screen.getByTestId('ProjectsPage.container.header.addProject')).toBeInTheDocument();
    expect(screen.getByTestId('ProjectsTable.container')).toBeInTheDocument();
  });

  it('should open the "AddProjectPopup" when the "Add Project" button is clicked', () => {
    const screen = setupScreen();

    act(() => {
      screen.getByTestId('ProjectsPage.button.addProject').click();
    });

    expect(screen.getByTestId('CreateProject.container')).toBeInTheDocument();
    expect(screen.getByText('CREATE PROJECT')).toBeInTheDocument();
  });

  it('should close the "AddProjectPopup" when the "Cancel" button is clicked', () => {
    const screen = setupScreen();

    act(() => {
      screen.getByTestId('ProjectsPage.button.addProject').click();
    });

    expect(screen.getByTestId('CreateProject.container')).toBeInTheDocument();

    act(() => {
      screen.getByTestId('Popup.close.button').click();
    });

    expect(screen.queryByTestId('CreateProject.container')).not.toBeInTheDocument();
  });

  it('should open the "CreateProjectPopup" in the edit mode when the edit project button is clicked', () => {
    const screen = setupScreen();

    act(() => {
      screen.getByTestId('ProjectsTable.button.edit-1').click();
    });

    expect(screen.getByTestId('CreateProject.container')).toBeInTheDocument();
    expect(screen.getByText('EDIT PROJECT')).toBeInTheDocument();
  });
});
