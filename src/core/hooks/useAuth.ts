import { useEffect, useState } from 'react';
import { authService } from '../services/AuthService';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const subscription = authService.isAuthenticated().subscribe(setIsAuthenticated);
    return () => subscription.unsubscribe();
  }, []);

  return isAuthenticated;
};
