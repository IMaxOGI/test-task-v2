import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuth } from '../core/hooks/useAuth';
import { container } from 'tsyringe';
import { AuthService } from '../core/services/AuthService';

const RootComponent = () => {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const authService = container.resolve(AuthService);

  const handleLogout = () => {
    authService.logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="text-gray-700 hover:text-gray-900"
            >
              {({ isActive }) => <span className={isActive ? 'font-bold' : ''}>Home</span>}
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900"
              >
                {({ isActive }) => <span className={isActive ? 'font-bold' : ''}>Login</span>}
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export default RootComponent;
