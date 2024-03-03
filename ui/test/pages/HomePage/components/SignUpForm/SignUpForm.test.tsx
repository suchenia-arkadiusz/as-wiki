import { fireEvent, render, within } from '@testing-library/react';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import SignUpForm from '../../../../../src/pages/HomePage/components/SignInOrSignUp/SignUpForm/SignUpForm.tsx';
import { RegisterUser } from "../../../../../src/contexts/types.ts";

const setupScreen = (register: (_body: RegisterUser) => void = () => {}) => {
  return render(
    <MockBrowser authContextProps={{ register }}>
      <SignUpForm />
    </MockBrowser>,
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
    expect(within(form).getByTestId('SignUpForm.username')).toBeInTheDocument();
    expect(within(form).getByTestId('SignUpForm.password')).toBeInTheDocument();
    expect(within(form).getByTestId('SignUpForm.confirmPassword')).toBeInTheDocument();
    expect(within(form).getByTestId('SignUpForm.email')).toBeInTheDocument();
    expect(within(form).getByTestId('SignUpForm.firstName')).toBeInTheDocument();
    expect(within(form).getByTestId('SignUpForm.lastName')).toBeInTheDocument();
    expect(within(form).getByTestId('SignUpForm.button')).toBeInTheDocument();
  });

  it('should call "register" function when form is submitted', () => {
    const register = vi.fn();
    const screen = setupScreen(register);

    fireEvent.change(screen.getByTestId('SignUpForm.username.input'), { target: { value: 'username' } });
    fireEvent.change(screen.getByTestId('SignUpForm.password.input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('SignUpForm.confirmPassword.input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('SignUpForm.email.input'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByTestId('SignUpForm.firstName.input'), { target: { value: 'firstName' } });
    fireEvent.change(screen.getByTestId('SignUpForm.lastName.input'), { target: { value: 'lastName' } });
    screen.getByTestId('SignUpForm.button').click();

    expect(register).toHaveBeenCalledWith({
      username: 'username',
      password: 'password',
      email: 'test@email.com',
      firstName: 'firstName',
      lastName: 'lastName'
    })
  })

  it('should call "register" function when form is submitted by hittinh the "Enter" key', () => {
    const register = vi.fn();
    const screen = setupScreen(register);

    fireEvent.change(screen.getByTestId('SignUpForm.username.input'), { target: { value: 'username' } });
    fireEvent.change(screen.getByTestId('SignUpForm.password.input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('SignUpForm.confirmPassword.input'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('SignUpForm.email.input'), { target: { value: 'test@email.com' } });
    fireEvent.change(screen.getByTestId('SignUpForm.firstName.input'), { target: { value: 'firstName' } });
    fireEvent.change(screen.getByTestId('SignUpForm.lastName.input'), { target: { value: 'lastName' } });
    fireEvent.keyDown(screen.getByTestId('SignUpFormContainer'), { key: 'Enter', code: 'Enter' });

    expect(register).toHaveBeenCalledWith({
      username: 'username',
      password: 'password',
      email: 'test@email.com',
      firstName: 'firstName',
      lastName: 'lastName'
    })
  })
});
