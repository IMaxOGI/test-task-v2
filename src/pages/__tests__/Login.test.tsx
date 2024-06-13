import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { useAuth } from '../../core/hooks/useAuth';
import { Login } from '../Login';

// Mock useAuth hook
vi.mock('../../core/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

// Mock AuthService
const mockAuthService = {
  login: vi.fn(),
  getAuthState: vi.fn(),
  logout: vi.fn(),
};

vi.mock('../../core/services/AuthService', () => ({
  AuthService: vi.fn().mockImplementation(() => mockAuthService),
}));

const renderWithRouter = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Login', () => {
  test('renders login form', () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue(false);
    renderWithRouter(<Login />);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('shows error message on invalid credentials', async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue(false);
    mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'));
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByText('Login'));
    expect(await screen.findByText('Invalid username or password')).toBeInTheDocument();
  });

  test('calls login on login button click', async () => {
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue(false);
    renderWithRouter(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Login'));
    expect(mockAuthService.login).toHaveBeenCalledWith('test', 'test');
  });
});
