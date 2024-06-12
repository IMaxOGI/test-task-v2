import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuth } from '../core/hooks/useAuth';

const RootComponent = () => {
  const isAuthenticated = useAuth();

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
              Home
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900"
              >
                {({ isActive }) => <span className={isActive ? 'font-bold' : ''}>Login</span>}
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/logout"
                className="text-gray-700 hover:text-gray-900"
              >
                Logout
              </Link>
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
