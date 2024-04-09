import { render } from '@testing-library/react';
import Button from '../../../src/components/Button/Button.tsx';
import { expect } from 'vitest';

const setupScreen = (iconName: string = '', text: string = '') => {
  return render(<Button onClick={() => {}} iconName={iconName} text={text} />);
};

describe('<Button />', () => {
  it('should render button without Icon component', () => {
    const screen = setupScreen();
    expect(screen.getByTestId('ButtonContainer')).toBeInTheDocument();
    expect(screen.queryByTestId('Icon.container')).not.toBeInTheDocument();
  });

  it('should render button with Icon component', () => {
    const screen = setupScreen('bi-x-lg');
    expect(screen.getByTestId('ButtonContainer')).toBeInTheDocument();
    expect(screen.queryByTestId('Icon.container')).toBeInTheDocument();
    expect(screen.queryByTestId('Icon.container')).toHaveClass('bi-x-lg');
    expect(screen.queryAllByTestId('Icon.container')).toHaveLength(1);
  });

  it('should render button with Icon component and text', () => {
    const screen = setupScreen('bi-x-lg', 'Close');
    expect(screen.getByTestId('ButtonContainer')).toBeInTheDocument();
    expect(screen.queryByTestId('Icon.container')).toBeInTheDocument();
    expect(screen.queryByTestId('Icon.container')).toHaveClass('bi-x-lg');
    expect(screen.queryAllByTestId('Icon.container')).toHaveLength(1);
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should render button with text', () => {
    const screen = setupScreen('', 'Close');
    expect(screen.getByTestId('ButtonContainer')).toBeInTheDocument();
    expect(screen.queryByTestId('Icon.container')).not.toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });
});
