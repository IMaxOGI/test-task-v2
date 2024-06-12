import React, { ReactNode } from 'react';
import { useAuth } from '../core/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <div className="text-center mt-5">Access Denied</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
