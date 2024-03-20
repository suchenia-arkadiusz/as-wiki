import AccessDeniedPage from '../../../../../src/pages/Page/components/AccessDeniedPage/AccessDeniedPage.tsx';
import {expect} from 'vitest';
import { render } from '@testing-library/react';

const setupScreen = () => {
  return render(
    <AccessDeniedPage />
  );
};

describe('<AccessDeniedPage />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText('Sorry, you do not have access to this page.')).toBeInTheDocument();
  });
});
