import { fireEvent, render, within } from '@testing-library/react';
import CreateProjectPopup from '../../../../../src/pages/Projects/components/CreateProjectPopup/CreateProjectPopup.tsx';
import { expect, vi } from 'vitest';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import { Project } from '../../../../../src/contexts/types.ts';
import * as validators from '../../../../../src/utils/validators.ts';

const onClose = vi.fn();

const projectContextProps = {
  addProject: vi.fn(),
  editProject: vi.fn(),
};

const setupScreen = (selectedProject: Project | undefined = undefined, isEdit: boolean = false) => {
  return render(
    <MockBrowser projectsContextProps={projectContextProps}>
      <CreateProjectPopup onClose={onClose} selectedProject={selectedProject} isEdit={isEdit} />
    </MockBrowser>
  );
};

describe('<CreateProjectPopup />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('CreateProject.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreateProject.button.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreateProject.input.name')).toBeInTheDocument();
    expect(screen.getByTestId('CreateProject.input.shortDescription')).toBeInTheDocument();
    expect(screen.getByTestId('CreateProject.editor.description')).toBeInTheDocument();
  });

  it('should render the form', () => {
    const screen = setupScreen();
    const formContainer = screen.getByTestId('CreateProject.container');
    const buttonContainer = screen.getByTestId('CreateProject.button.container');

    expect(within(formContainer).getByText('Name *')).toBeInTheDocument();
    expect(within(formContainer).getByTestId('CreateProject.editor.description')).toBeInTheDocument();
    expect(within(buttonContainer).getByText('Save')).toBeInTheDocument();
    expect(within(within(buttonContainer).getByText('Save')).getByTestId('Icon.container')).toHaveClass('bi-floppy');
  });

  it('should call the addProject when the form is submitted', () => {
    const screen = setupScreen();

    fireEvent.change(screen.getByTestId('CreateProject.input.name.input'), {target: {value: 'Test Project'}});
    fireEvent.change(screen.getByTestId('CreateProject.input.shortDescription.input'), {target: {value: 'Test Project short description'}});

    screen.getByTestId('CreateProject.button.save').click();

    expect(projectContextProps.addProject).toHaveBeenCalledWith(
      {
        id: '',
        name: 'Test Project',
        shortDescription: 'Test Project short description',
        description: ''
      },
      onClose
    );
  });

  it('should call the editProject when the form is submitted', () => {
    const project = {
      id: '1',
      name: 'Test Project',
      shortDescription: 'Test Project short description',
      description: ''
    };
    const screen = setupScreen(project, true);

    expect(screen.getByTestId('CreateProject.input.name.input')).toHaveAttribute('value', 'Test Project');
    expect(screen.getByTestId('CreateProject.input.shortDescription.input')).toHaveAttribute('value', 'Test Project short description');

    fireEvent.change(screen.getByTestId('CreateProject.input.name.input'), {target: {value: 'Test Project edited'}});

    screen.getByTestId('CreateProject.button.save').click();

    expect(projectContextProps.editProject).toHaveBeenCalledWith(
      {
        id: '1',
        name: 'Test Project edited',
        shortDescription: 'Test Project short description',
        description: ''
      },
      onClose
    );
  });

  it('should call the "validateStringInput" function when the name input is changed', () => {
    const validateStringInput = vi.spyOn(validators, 'validateStringInput');
    const screen = setupScreen();

    fireEvent.change(screen.getByTestId('CreateProject.input.name.input'), { target: { value: 'Test Project' } });

    expect(validateStringInput).toHaveBeenCalledWith('Test Project');
  });

  it('should call the "validateStringInput" function when the short description input is changed', () => {
    const validateStringInput = vi.spyOn(validators, 'validateStringInput');
    const screen = setupScreen();

    fireEvent.change(screen.getByTestId('CreateProject.input.shortDescription.input'), { target: { value: 'Test Project' } });

    expect(validateStringInput).toHaveBeenCalledWith('Test Project');
  });

  it('should have disabled button when the name is not valid', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('CreateProject.button.save')).toHaveAttribute('disabled');
  });

  it('should call the "onClose" function when the "Cancel" button is clicked', () => {
    const screen = setupScreen();

    screen.getByTestId('Popup.close.button').click();

    expect(onClose).toHaveBeenCalled();
  });
});
