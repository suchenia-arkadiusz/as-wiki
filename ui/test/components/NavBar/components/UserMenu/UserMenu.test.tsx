import { render } from '@testing-library/react';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import UserMenu from '../../../../../src/components/NavBar/components/UserMenu/UserMenu.tsx';
import { expect, vi } from 'vitest';

const onClose = vi.fn();

const authContextHandler = {
  logout: vi.fn()
};

const setupScreen = () => {
  return render(
    <MockBrowser authContextProps={authContextHandler}>
      <UserMenu onClose={onClose}/>
    </MockBrowser>
  );
};

describe('<UserMenu />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('UserMenu.overlay')).toBeInTheDocument();
    expect(screen.getByTestId('UserMenu.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserMenu.item.profile')).toBeInTheDocument();
    expect(screen.getByTestId('UserMenu.item.separator-1')).toBeInTheDocument();
    expect(screen.getByTestId('UserMenu.item.signOut')).toBeInTheDocument();
  });

  it('should call onClose when clicking on the "UseMenuOverlay"', () => {
    const screen = setupScreen();

    screen.getByTestId('UserMenu.overlay').click();

    expect(onClose).toHaveBeenCalled();
  });

  it('should sign out user when the "Sign Out" button is clicked', () => {
    const screen = setupScreen();

    screen.getByTestId('UserMenu.item.signOut').click();

    expect(authContextHandler.logout).toHaveBeenCalled();
  });
});
