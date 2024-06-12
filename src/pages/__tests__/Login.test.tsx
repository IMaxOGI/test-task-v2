import 'reflect-metadata';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { container } from 'tsyringe';
import { AuthService } from '../../core/services/AuthService';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import React from 'react';
import { Login } from '../Login';
import { of } from 'rxjs';

vi.mock('../../core/services/AuthService', () => {
  return {
    AuthService: vi.fn().mockImplementation(() => {
      return {
        login: vi.fn(),
        logout: vi.fn(),
        isAuthenticated: vi.fn().mockReturnValue(of(false)),
        getAuthState: vi.fn().mockReturnValue(false),
      };
    }),
  };
});

const mockAuthService = container.resolve(AuthService) as jest.Mocked<AuthService>;

beforeEach(() => {
  vi.clearAllMocks();
  container.clearInstances();
});

const renderWithRouter = (ui: React.ReactElement) => {
  const routes = [
    {
      path: '/',
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);

  return render(<RouterProvider router={router} />);
};

test('renders login form', () => {
  renderWithRouter(<Login />);
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('shows error message on invalid credentials', () => {
  mockAuthService.login.mockImplementation(() => {
    throw new Error('Invalid credentials');
  });

  renderWithRouter(<Login />);
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invalid' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalid' } });
  fireEvent.click(screen.getByText('Login'));

  expect(mockAuthService.login).toHaveBeenCalled();
  expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
});
