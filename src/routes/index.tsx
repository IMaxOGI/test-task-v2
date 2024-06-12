import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootComponent from '../components/RootComponent';
import { Login } from '../pages/Login';
import { Logout } from '../pages/Logout';
import { Home } from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const logoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/logout',
  component: Logout,
});

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/protected',
  component: () => (
    <ProtectedRoute>
      <div className="text-center mt-5">Protected Content</div>
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute, logoutRoute, protectedRoute]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export { router };
