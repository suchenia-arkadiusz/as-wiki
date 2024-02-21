import { render, within } from '@testing-library/react';
import CreateProjectPopup from '../../../../../src/pages/Projects/components/CreateProjectPopup/CreateProjectPopup.tsx';
import { expect, vi } from 'vitest';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import { Project } from '../../../../../src/contexts/types.ts';

const onClose = vi.fn();

const setupScreen = (selectedProject: Project | undefined = undefined, isEdit: boolean = false) => {
  return render(
    <MockBrowser>
      <CreateProjectPopup onClose={onClose} selectedProject={selectedProject} isEdit={isEdit} />
    </MockBrowser>
  );
};

describe('<CreateProjectPopup />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('CreateProject.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreateProject.button.container')).toBeInTheDocument();
  });

  it('should render the form', () => {
    const screen = setupScreen();
    const formContainer = screen.getByTestId('CreateProject.container');
    const buttonContainer = screen.getByTestId('CreateProject.button.container');

    expect(within(formContainer).getByText('Name *')).toBeInTheDocument();
    expect(within(formContainer).getByTestId('CreateProject.description')).toBeInTheDocument();
    expect(within(buttonContainer).getByText('Save')).toBeInTheDocument();
    expect(within(within(buttonContainer).getByText('Save')).getByTestId('IconContainer')).toHaveClass('bi-floppy');
  });
});
