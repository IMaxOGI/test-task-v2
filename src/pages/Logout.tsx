import React, { useEffect } from 'react';
import { container } from 'tsyringe';
import { AuthService } from '../core/services/AuthService';

export const Logout: React.FC = () => {
  const authService = container.resolve(AuthService);

  useEffect(() => {
    authService.logout();
  }, [authService]);

  return <div className="text-center mt-5">You have been logged out.</div>;
};
