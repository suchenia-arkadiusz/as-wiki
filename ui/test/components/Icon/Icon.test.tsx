import Icon from '../../../src/components/Icon/Icon.tsx';
import { render } from '@testing-library/react';
import { expect } from 'vitest';

const setupScreen = (iconName: string = '') => {
  return render(<Icon iconName={iconName} />);
};

describe('Icon', () => {
  it('should render IconContainer', () => {
    const screen = setupScreen();
    expect(screen.getByTestId('Icon.container')).toBeInTheDocument();
  });

  it('should render Icon.container with className', () => {
    const screen = setupScreen('bi-x-lg');
    expect(screen.getByTestId('Icon.container')).toBeInTheDocument();
    expect(screen.getByTestId('Icon.container')).toHaveClass('bi-x-lg');
  });
});
