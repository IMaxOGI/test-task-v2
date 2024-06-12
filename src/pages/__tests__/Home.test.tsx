import { render, screen } from '@testing-library/react';
import { Home } from '../Home';

test('renders Hello world message', () => {
  render(<Home />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
