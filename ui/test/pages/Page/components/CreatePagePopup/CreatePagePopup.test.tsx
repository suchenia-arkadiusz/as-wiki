import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import MockPagesContext from '../../../../mocks/contexts/MockPagesContext.tsx';
import CreatePagePopup from '../../../../../src/pages/Page/components/CreatePagePopup/CreatePagePopup.tsx';
import {type Page} from '../../../../../src/types.ts';
import { fireEvent, render } from '@testing-library/react';
import {expect, vi} from 'vitest';
import * as validators from '../../../../../src/utils/validators.ts';

const onClose = vi.fn();
const updatePage = vi.fn();
const createPage = vi.fn();

const setupScreen = (isEdit: boolean = false, selectedPage: Page | undefined = undefined) => {
  return render(
    <MockBrowser>
      <MockPagesContext createPage={createPage} updatePage={updatePage}>
        <CreatePagePopup isEdit={isEdit} onClose={onClose} selectedPage={selectedPage} />
      </MockPagesContext>
    </MockBrowser>
  );
};

describe('<CreatePagePopup />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('CreatePage.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.name')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.button.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.button.save')).toBeInTheDocument();
    expect(screen.getByTestId('MDEditor.container')).toBeInTheDocument();
    expect(screen.getByText('CREATE PAGE')).toBeInTheDocument();
  });

  it('should render the component in the edit mode', () => {
    const page = {
      id: '1',
      name: 'Test page',
      content: 'Test content',
      createdBy: {
        username: 'user1',
        id: '1'
      },
      updatedAt: new Date(),
      updatedBy: {
        username: 'user2',
        id: '2'
      }
    };
    const screen = setupScreen(true, page);

    expect(screen.getByTestId('CreatePage.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.name')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.button.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.button.save')).toBeInTheDocument();
    expect(screen.getByText('EDIT PAGE')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.name.input')).toHaveAttribute('value', 'Test page');
  });

  it('should call "createPage" function when the "Save" button is clicked', () => {
    const screen = setupScreen();
    const input = screen.getByTestId('CreatePage.name.input');

    fireEvent.change(input, { target: { value: 'Test page' } });
    screen.getByTestId('CreatePage.button.save').click();

    expect(screen.getByTestId('CreatePage.button.save')).not.toHaveAttribute('disabled');
    expect(createPage).toHaveBeenCalled();
  });

  it('should have disabled button when the name is not valid', () => {
    const screen = setupScreen();
    const input = screen.getByTestId('CreatePage.name.input');

    fireEvent.change(input, { target: { value: '' } });

    expect(screen.getByTestId('CreatePage.button.save')).toHaveAttribute('disabled');
  });

  it('should call "updatePage" function when the "Save" button is clicked in the edit mode', () => {
    const page = {
      id: '1',
      name: 'Test page',
      content: 'Test content',
      createdBy: {
        username: 'user1',
        id: '1'
      },
      updatedAt: new Date(),
      updatedBy: {
        username: 'user2',
        id: '2'
      }
    };
    const screen = setupScreen(true, page);

    screen.getByTestId('CreatePage.button.save').click();

    expect(screen.getByTestId('CreatePage.button.save')).not.toHaveAttribute('disabled');
    expect(updatePage).toHaveBeenCalled();
  });

  it('should call the "validateStringInput" function when the name input is changed', () => {
    const validateStringInput = vi.spyOn(validators, 'validateStringInput');
    const screen = setupScreen();
    const input = screen.getByTestId('CreatePage.name.input');

    fireEvent.change(input, { target: { value: 'Test page' } });

    expect(validateStringInput).toHaveBeenCalledWith('Test page');
  });
});
