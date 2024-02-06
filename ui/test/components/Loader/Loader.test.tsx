import { render } from '@testing-library/react';
import Loader from '../../../src/components/Loader/Loader';
import { expect } from 'vitest';

const setupScreen = () => {
  return render(<Loader />);
};

describe('<Loader />', () => {
  it('should render LoaderContainer', () => {
    const screen = setupScreen();
    expect(screen.getByTestId('LoaderContainer')).toBeInTheDocument();
    expect(screen.getByTestId('LoaderContainer')).toHaveClass('loader');
  });
});
