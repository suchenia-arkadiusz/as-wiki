import { render } from '@testing-library/react';
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
});
