import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest'; // Правильный импорт для vitest
import { useAuth } from '../../core/hooks/useAuth';
import ProtectedRoute from '../ProtectedRoute';

vi.mock('../../core/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render access denied message if not authenticated', () => {
    mockUseAuth.mockReturnValue(false);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children if authenticated', () => {
    mockUseAuth.mockReturnValue(true);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Access Denied')).not.toBeInTheDocument();
  });
});
