import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const RootComponent = () => {
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
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900"
            >
              {({ isActive }) => <span className={isActive ? 'font-bold' : ''}>Login</span>}
            </Link>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="text-gray-700 hover:text-gray-900">Menu</DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white shadow-lg rounded-md p-2">
              <DropdownMenu.Item className="p-2 rounded-md hover:bg-gray-200">
                <Link to="/">Home</Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="p-2 rounded-md hover:bg-gray-200">
                <Link to="/login">Login</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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
