import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import RootComponent from '../components/RootComponent';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

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

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);

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
