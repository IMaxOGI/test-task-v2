import { AnyRoute, createRoute } from '@tanstack/react-router';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

// Определение маршрутов
const homeRoute = createRoute({
  path: '/',
  component: Home,
  getParentRoute: function (): AnyRoute {
    throw new Error('Function not implemented.');
  },
});

const loginRoute = createRoute({
  path: '/login',
  component: Login,
  getParentRoute: function (): AnyRoute {
    throw new Error('Function not implemented.');
  },
});

export const routeTree = homeRoute.addChildren([loginRoute]);
