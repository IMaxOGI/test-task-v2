import React, { useState } from 'react';
import { authService } from '../core/services/AuthService';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    authService.login(username, password);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
