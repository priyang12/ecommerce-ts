import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';
import '@testing-library/jest-dom';

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  it('User Input', () => {
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);

    userEvent.type(email, 'sdas#gmail.com');
    userEvent.type(password, 'asdas');

    expect(email).toHaveValue('sdas#gmail.com');
    expect(password).toHaveValue('asdas');
  });
  it('Check For User Valid Input on Submit', () => {
    const email = screen.getByLabelText(/email/i);

    //Empty Check
    userEvent.click(screen.getByText(/login/i));
    expect(
      screen.getByText(/Please Enter All The Fields Properly/)
    ).toBeInTheDocument();

    //Email validation
    userEvent.type(email, 'sdas#gmail.com');
    userEvent.click(screen.getByText(/login/i));
    expect(screen.getByText(/Valid Email Address/)).toBeInTheDocument();
  });
});
