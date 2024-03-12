import UserAvatar from '../../../../../src/components/NavBar/components/UserAvatar/UserAvatar.tsx';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import { act, render } from '@testing-library/react';
import { expect } from 'vitest';

const setupScreen = () => {
  return render(
    <MockBrowser>
      <UserAvatar />
    </MockBrowser>
  );
};

describe('<UserAvatar />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('UserAvatar.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserAvatar.button.avatar')).toBeInTheDocument();
  });

  it('should contain user name', () => {
    const screen = setupScreen();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should contain user avatar', () => {
    const screen = setupScreen();
    expect(screen.getByAltText('User\'s avatar')).toBeInTheDocument();
  });

  it('should open the user menu when clicking on the avatar', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('UserAvatar.button.avatar').click()
    );

    expect(screen.getByTestId('UserMenu.container')).toBeInTheDocument();
  });

  it('should close the user menu when clicking on the avatar again', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('UserAvatar.button.avatar').click()
    );

    expect(screen.getByTestId('UserMenu.container')).toBeInTheDocument();

    act(() =>
      screen.getByTestId('UserAvatar.button.avatar').click()
    );

    expect(screen.queryByTestId('UserMenu.container')).not.toBeInTheDocument();
  });

  it('should close the user menu when clicking on the overlay', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('UserAvatar.button.avatar').click()
    );

    expect(screen.getByTestId('UserMenu.container')).toBeInTheDocument();

    act(() =>
      screen.getByTestId('UserMenu.overlay').click()
    );

    expect(screen.queryByTestId('UserMenu.container')).not.toBeInTheDocument();
  });
});
