import { render, within } from '@testing-library/react';
import SignInForm from '../../../../../src/pages/HomePage/components/SignInOrSignUp/SignInForm/SignInForm.tsx';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';

const setupScreen = () => {
  return render(
    <MockBrowser>
      <SignInForm />
    </MockBrowser>
  );
};

describe('<SignInForm />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('SignInFormContainer')).toBeInTheDocument();
  });

  it('should render the form', () => {
    const screen = setupScreen();
    const form = screen.getByTestId('SignInFormContainer');

    expect(within(form).getByText('Username *')).toBeInTheDocument();
    expect(within(form).getByText('Password *')).toBeInTheDocument();
    expect(within(form).getByText('Sign in')).toBeInTheDocument();
  });
});
