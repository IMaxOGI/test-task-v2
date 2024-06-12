import 'reflect-metadata';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { container } from 'tsyringe';
import { AuthService } from '../../core/services/AuthService';
import RootComponent from '../RootComponent';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import React from 'react';
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

test('renders Home link and Login link when not authenticated', () => {
  renderWithRouter(<RootComponent />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('renders Home link and Logout button when authenticated', () => {
  mockAuthService.getAuthState.mockReturnValue(true);
  mockAuthService.isAuthenticated.mockReturnValue(of(true));

  renderWithRouter(<RootComponent />);
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Logout')).toBeInTheDocument();
});

test('calls logout method when Logout button is clicked', () => {
  mockAuthService.getAuthState.mockReturnValue(true);
  mockAuthService.isAuthenticated.mockReturnValue(of(true));

  renderWithRouter(<RootComponent />);
  fireEvent.click(screen.getByText('Logout'));
  expect(mockAuthService.logout).toHaveBeenCalled();
});
