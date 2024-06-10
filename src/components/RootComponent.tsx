import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const RootComponent = () => {
  return (
    <div>
      <nav>
        <Link
          to="/"
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link to="/login">{({ isActive }) => <span className={isActive ? 'font-bold' : ''}>Login</span>}</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export default RootComponent;
