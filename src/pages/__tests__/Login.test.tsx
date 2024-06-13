import React from 'react';
import 'reflect-metadata';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { container } from 'tsyringe';
import { Login } from '../Login';
import { vi } from 'vitest';
import { of } from 'rxjs';

vi.mock('../core/hooks/useAuth', () => ({
  useAuth: vi.fn(() => false),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}));

const mockAuthService = {
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: vi.fn().mockReturnValue(of(false)),
  getAuthState: vi.fn().mockReturnValue(false),
};

vi.mock('../../core/services/AuthService', () => ({
  AuthService: vi.fn().mockImplementation(() => mockAuthService),
}));

beforeEach(() => {
  vi.clearAllMocks();
  container.clearInstances();
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route
          path="/login"
          element={ui}
        />
      </Routes>
    </MemoryRouter>,
  );
};

test('renders login form', () => {
  renderWithRouter(<Login />);
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('shows error message on invalid credentials', async () => {
  mockAuthService.login.mockImplementation(() => Promise.reject(new Error('Invalid credentials')));

  renderWithRouter(<Login />);
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalid' } });
  fireEvent.click(screen.getByText('Login'));

  await waitFor(() => {
    expect(mockAuthService.login).toHaveBeenCalled();
  });

  expect(await screen.findByText('Invalid username or password')).toBeInTheDocument();
});
