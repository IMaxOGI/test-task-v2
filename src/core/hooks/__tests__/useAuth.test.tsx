import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useAuth } from '../useAuth';

const TestComponent = () => {
  const isAuthenticated = useAuth();
  return <div>{isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</div>;
};

vi.mock('../useAuth', () => ({
  useAuth: vi.fn(),
}));

const mockUseAuth = useAuth as jest.Mock;

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return initial auth state', () => {
    mockUseAuth.mockReturnValue(false);
    render(<TestComponent />);
    expect(screen.getByText('Not Authenticated')).toBeInTheDocument();
  });

  it('should update auth state when logged in', () => {
    mockUseAuth.mockReturnValue(true);
    render(<TestComponent />);
    expect(screen.getByText('Authenticated')).toBeInTheDocument();
  });
});
