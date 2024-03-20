import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import MockBrowser from '../../mocks/MockBrowser.tsx';
import UserProfilePage from '../../../src/pages/UserProfile/UserProfilePage.tsx';
import { expect, vi } from 'vitest';

const updateUser = vi.fn();

const setupScreen = (user = undefined) => {
  return render(
    <MockBrowser userContextProps={{updateUser, user}}>
      <UserProfilePage />
    </MockBrowser>
  );
};

describe('UserProfilePage', () => {

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the page', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('UserProfilePage.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.username')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.email')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.firstName')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.lastName')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.currentPassword')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.newPassword')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.confirmPassword')).toBeInTheDocument();
    expect(screen.getByTestId('UserProfilePage.button.edit')).toBeInTheDocument();
    expect(screen.getByText('User Profile Info')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.queryByTestId('UserProfilePage.button.save')).not.toBeInTheDocument();

    expect(screen.getByTestId('UserProfilePage.username.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.email.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.firstName.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.lastName.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.currentPassword.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.newPassword.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.confirmPassword.input')).toBeDisabled();
  });

  it('should render the page in edit mode', () => {
    const screen = setupScreen();

    act(() => {
      screen.getByTestId('UserProfilePage.button.edit').click();
    });

    expect(screen.getByTestId('UserProfilePage.username.input')).toBeDisabled();
    expect(screen.getByTestId('UserProfilePage.email.input')).toBeEnabled();
    expect(screen.getByTestId('UserProfilePage.firstName.input')).toBeEnabled();
    expect(screen.getByTestId('UserProfilePage.lastName.input')).toBeEnabled();
    expect(screen.getByTestId('UserProfilePage.currentPassword.input')).toBeEnabled();
    expect(screen.getByTestId('UserProfilePage.newPassword.input')).toBeEnabled();
    expect(screen.getByTestId('UserProfilePage.confirmPassword.input')).toBeEnabled();
    expect(screen.getByTestId('UserProfilePage.button.save')).toBeInTheDocument();
  });

  it('should update the userProfile', () => {
    const screen = setupScreen();

    act(() => {
      screen.getByTestId('UserProfilePage.button.edit').click();
    });

    act(() => {
      fillTheForm(screen, true);
    });

    act(() => {
      screen.getByTestId('UserProfilePage.button.save').click();
    });

    expect(updateUser).toHaveBeenCalledWith({
      id: 'userId',
      username: 'test',
      email: 'edited@test.com',
      firstName: 'Edited Test',
      lastName: 'User',
      password: '',
      avatarUrl: ''
    }, 'current', 'new');
    expect(screen.queryByTestId('UserProfilePage.button.save')).not.toBeInTheDocument();
  });

  it('should not update the userProfile when the password does not match', () => {
    const screen = setupScreen();

    act(() => {
      screen.getByTestId('UserProfilePage.button.edit').click();
    });

    act(() => {
      fillTheForm(screen, false);
    });

    act(() => {
      screen.getByTestId('UserProfilePage.button.save').click();
    });

    expect(updateUser).not.toHaveBeenCalled();
    expect(screen.getByTestId('UserProfilePage.button.save')).toBeInTheDocument();
  });
});

const fillTheForm = (screen: RenderResult, isPasswordCorrect: boolean) => {
  fireEvent.change(screen.getByTestId('UserProfilePage.email.input'), {target: {value: 'edited@test.com'}});
  fireEvent.change(screen.getByTestId('UserProfilePage.firstName.input'), {target: {value: 'Edited Test'}});
  fireEvent.change(screen.getByTestId('UserProfilePage.lastName.input'), {target: {value: 'User'}});
  fireEvent.change(screen.getByTestId('UserProfilePage.currentPassword.input'), {target: {value: 'current'}});
  fireEvent.change(screen.getByTestId('UserProfilePage.newPassword.input'), {target: {value: 'new'}});
  fireEvent.change(screen.getByTestId('UserProfilePage.confirmPassword.input'), {target: {value: isPasswordCorrect ? 'new' : 'new2'}});
};
