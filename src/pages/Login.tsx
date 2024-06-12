import React, { useState } from 'react';
import { container } from 'tsyringe';
import { AuthService } from '../core/services/AuthService';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useNavigate } from '@tanstack/react-router';

export const Login: React.FC = () => {
  const authService = container.resolve(AuthService);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    authService.login(username, password);
    if (authService.getAuthState()) {
      setError(null);
      navigate({ to: '/' }); // Перенаправление на главную страницу после успешного входа
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleLogin}
        className="w-full max-w-md px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
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
