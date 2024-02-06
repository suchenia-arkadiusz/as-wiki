import { render, within } from '@testing-library/react';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import SignUpForm from '../../../../../src/pages/HomePage/components/SignInOrSignUp/SignUpForm/SignUpForm.tsx';

const setupScreen = () => {
  return render(
    <MockBrowser>
      <SignUpForm />
    </MockBrowser>
  );
};

describe('<SignUpForm />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('SignUpFormContainer')).toBeInTheDocument();
  });

  it('should render the form', () => {
    const screen = setupScreen();

    const form = screen.getByTestId('SignUpFormContainer');
    expect(within(form).getByText('Username *')).toBeInTheDocument();
    expect(within(form).getByText('Password *')).toBeInTheDocument();
    expect(within(form).getByText('Confirm password *')).toBeInTheDocument();
    expect(within(form).getByText('E-mail *')).toBeInTheDocument();
    expect(within(form).getByText('First name')).toBeInTheDocument();
    expect(within(form).getByText('Last name')).toBeInTheDocument();
    expect(within(form).getByText('Sign up')).toBeInTheDocument();
  });
});
