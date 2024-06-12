import 'reflect-metadata';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { container } from 'tsyringe';
import { AuthService } from '../../core/services/AuthService';
import RootComponent from '../RootComponent';
import { RouterProvider, createRouter, createRootRoute } from '@tanstack/react-router';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { of } from 'rxjs';

// Мокаем AuthService
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

const rootRoute = createRootRoute({
  component: RootComponent,
});

const router = createRouter({
  routeTree: rootRoute.addChildren([]),
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <RouterProvider router={router}>{ui}</RouterProvider>
    </MemoryRouter>,
  );
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
