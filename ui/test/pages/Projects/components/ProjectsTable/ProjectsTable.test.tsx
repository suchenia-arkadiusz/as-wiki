import { render, waitFor, within } from '@testing-library/react';
import ProjectsTable from '../../../../../src/pages/Projects/components/ProjectsTable/ProjectsTable.tsx';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import { expect, vi } from 'vitest';

const openPopup = vi.fn();

const setupScreen = () => {
  return render(
    <MockBrowser>
      <ProjectsTable openPopup={openPopup}/>
    </MockBrowser>
  );
};

describe('<ProjectsTable />', () => {
  it('should render the component', async () => {
    const screen = setupScreen();

    expect(screen.getByTestId('ProjectsTable.container')).toBeInTheDocument();
    expect(screen.getByTestId('ProjectsTable.table.header')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByTestId('ProjectsTable.table.row').length).toBeGreaterThan(0);
    });
  });

  it('should render the row', async () => {
    const screen = setupScreen();
    const row = (await screen.findAllByTestId('ProjectsTable.table.row'))[0];

    expect(within(row).getByTestId('ProjectsTable.table.row.logo')).toBeInTheDocument();
    expect(within(row).getByTestId('ProjectLogo.container')).toBeInTheDocument();
    expect(within(row).getByTestId('ProjectLogo.container').children.length).toBeGreaterThan(0);
    expect(within(row).getByTestId('ProjectsTable.table.row.name')).toBeInTheDocument();
    expect(within(row).getByTestId('ProjectsTable.table.row.description')).toBeInTheDocument();
    expect(within(row).getByTestId('ProjectsTable.table.row.actions')).toBeInTheDocument();
  });

  it('should render the row with actions', async () => {
    const screen = setupScreen();
    const row = (await screen.findAllByTestId('ProjectsTable.table.row'))[0];
    const actions = within(row).getByTestId('ProjectsTable.table.row.actions');

    expect(within(actions).getByTestId('ProjectsTable.button.info-1')).toBeInTheDocument();
    expect(within(actions).getByTestId('ProjectsTable.button.edit-1')).toBeInTheDocument();
    expect(within(actions).getByTestId('ProjectsTable.button.remove-1')).toBeInTheDocument();
  });
});
