import React, { useState, useEffect } from 'react';
import { container } from 'tsyringe';
import { AuthService } from '../core/services/AuthService';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../core/hooks/useAuth';
import Input from '../shared/ui/Input';
import Button from '../shared/ui/Button';

export const Login: React.FC = () => {
  const authService = container.resolve(AuthService);
  const isAuthenticated = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/' });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    authService.login(username, password);
    if (authService.getAuthState()) {
      setError(null);
      navigate({ to: '/' });
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 space-y-4">
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      {error && <p className="text-red-500">{error}</p>}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="mt-4 text-gray-700 hover:text-gray-900">Options</DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white shadow-lg rounded-md p-2">
          <DropdownMenu.Item className="p-2 rounded-md hover:bg-gray-200">
            <button>Forgot Password</button>
          </DropdownMenu.Item>
          <DropdownMenu.Item className="p-2 rounded-md hover:bg-gray-200">
            <button>Help</button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
