import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from '../Auth';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider } from '../../Context/AuthContext';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router';
import '@testing-library/jest-dom';

describe('Toggle Login Register', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router history={history}>
          <Auth />
        </Router>
      </AuthProvider>
    );
  });
  it('Login on init', () => {
    expect(screen.getByDisplayValue(/login/i)).toBeInTheDocument();
  });
  it('Toggle on Click ', () => {
    userEvent.click(screen.getByText('Register'));
    expect(screen.getByDisplayValue(/Register/i)).toBeInTheDocument();
    userEvent.click(screen.getByText('Login'));
    expect(screen.getByDisplayValue(/login/i)).toBeInTheDocument();
  });
});

describe('Mock Calls ', () => {
  let mock: MockAdapter;
  let History: MemoryHistory<unknown>;
  beforeEach(() => {
    const a = axios.create();
    mock = new MockAdapter(a);
    History = createMemoryHistory();
    render(
      <AuthProvider>
        <Router history={History}>
          <Auth />
        </Router>
      </AuthProvider>
    );
  });

  afterEach(() => {
    mock.reset();
  });
  it('Successful login And Redirect To Home', async () => {
    const token = 'asdbsabdibaisd45asd';
    mock.onPost('/api/users/login').reply(200, token);
    userEvent.type(screen.getByLabelText(/email/i), 'PatelPriyang95@gmail.com');
    userEvent.type(screen.getByLabelText(/password/i), '123456');
    userEvent.click(screen.getByText('login'));

    //Check For Loading State
    await waitFor(() => screen.getByTestId('Loading'));

    await waitForElementToBeRemoved(() => screen.getByTestId('Loading'));

    expect(History.location.pathname).toBe('/');
  });

  it('Successful Register', () => {
    const token = 'asdbsabdibaisd45asd';
    mock.onPost('/api/users/register').reply(200, token);
    userEvent.click(screen.getByText('Register'));
    expect(screen.getByDisplayValue(/Register/i)).toBeInTheDocument();
    const pass = screen.getAllByLabelText(/password/i);
    const password = pass[0];
    const password2 = pass[1];
    userEvent.type(screen.getByLabelText(/name/i), 'priyang');
    userEvent.type(screen.getByLabelText(/email/i), 'asdasio@gmail.com');
    userEvent.type(password, '123456');
    userEvent.type(password2, '123456');
    userEvent.click(screen.getByDisplayValue(/Register/i));
    expect(History.location.pathname).toBe('/');
  });
});
