import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '../routes';

// Создаем роутер
const router = createRouter({
  routeTree,
});

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
