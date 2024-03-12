import { fireEvent, render, within } from '@testing-library/react';
import SignInForm from '../../../../../src/pages/HomePage/components/SignInOrSignUp/SignInForm/SignInForm.tsx';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import {expect, vi} from 'vitest';

const setupScreen = (login: (_username: string, _password: string) => void = () => {}) => {
  return render(
    <MockBrowser authContextProps={{login}}>
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
    expect(within(form).getByTestId('SignInForm.username')).toBeInTheDocument();
    expect(within(form).getByTestId('SignInForm.password')).toBeInTheDocument();
    expect(within(form).getByTestId('SignInForm.button')).toBeInTheDocument();
  });

  it('should call "login" function when form is submitted', () => {
    const login = vi.fn();
    const screen = setupScreen(login);

    fireEvent.change(screen.getByTestId('SignInForm.username.input'), { target: { value: 'username' } });
    fireEvent.change(screen.getByTestId('SignInForm.password.input'), { target: { value: 'password' } });
    screen.getByTestId('SignInForm.button').click();

    expect(login).toHaveBeenCalledWith('username', 'password');
  });

  it('should call "login" function when form is submitted by hitting the "Enter" key', () => {
    const login = vi.fn();
    const screen = setupScreen(login);

    fireEvent.change(screen.getByTestId('SignInForm.username.input'), { target: { value: 'username' } });
    fireEvent.change(screen.getByTestId('SignInForm.password.input'), { target: { value: 'password' } });
    fireEvent.keyDown(screen.getByTestId('SignInFormContainer'), { key: 'Enter', code: 'Enter' });

    expect(login).toHaveBeenCalledWith('username', 'password');
  });
});
