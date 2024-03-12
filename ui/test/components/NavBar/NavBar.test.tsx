import { NavBar } from '../../../src/components/NavBar/NavBar.tsx';
import { render } from '@testing-library/react';
import MockBrowser from '../../mocks/MockBrowser.tsx';
import { expect } from 'vitest';

const setupScreen = () => {
  return render(
    <MockBrowser>
      <NavBar />
    </MockBrowser>
  );
};

describe('<NavBar />', () => {
  it('should render NavBarContainer', () => {
    const screen = setupScreen();
    expect(screen.getByTestId('NavBar.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserAvatar.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserAvatar.button.avatar')).toBeInTheDocument();
    expect(screen.getByTestId('NavBar.button.projects')).toBeInTheDocument();
  });

  it('should contain app name', () => {
    const screen = setupScreen();
    expect(screen.getByText('asWiki')).toBeInTheDocument();
  });

  it('should contain user name', () => {
    const screen = setupScreen();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should contain user avatar', () => {
    const screen = setupScreen();
    expect(screen.getByAltText('User\'s avatar')).toBeInTheDocument();
  });
});
