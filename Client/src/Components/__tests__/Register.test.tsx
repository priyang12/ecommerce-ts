import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../Register';

describe('Register Component', () => {
  let name: HTMLElement;
  let email: HTMLElement;
  let password: HTMLElement;
  let password2: HTMLElement;
  beforeEach(() => {
    render(<Register />);
    name = screen.getByLabelText(/name/i);
    email = screen.getByLabelText(/email/i);
    const pass = screen.getAllByLabelText(/password/i);
    password = pass[0];
    password2 = pass[1];
  });

  it('Check For User Valid Email on  Submit', () => {
    userEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/Valid Email/)).toBeInTheDocument();
    expect(screen.getByText(/Name Should 5-10 /)).toBeInTheDocument();
  });

  it('Check For User confirm Password', () => {
    userEvent.type(password, '123456');
    userEvent.type(password2, '1566');
    userEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/Passwords Does not Match/)).toBeInTheDocument();

    userEvent.type(password2, '1566');
    userEvent.click(screen.getByText(/Register/i));
    expect(screen.getByText(/Confirm/)).toBeInTheDocument();
  });
});
