import NotFoundPage from '../../../../src/pages/Errors/404/NotFoundPage.tsx';
import { render } from '@testing-library/react';

const setupScreen = () => {
  return render(
    <NotFoundPage />
  );
};

describe('<NotFoundPage />', () => {
  it('should render 404 Page Not Found', () => {
    const screen = setupScreen();

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
