import { useEffect, useState } from 'react';
import { container } from 'tsyringe';
import { AuthService } from '../services/AuthService';

export const useAuth = () => {
  const authService = container.resolve(AuthService);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.getAuthState());

  useEffect(() => {
    const subscription = authService.isAuthenticated().subscribe(setIsAuthenticated);
    return () => subscription.unsubscribe();
  }, [authService]);

  return isAuthenticated;
};
