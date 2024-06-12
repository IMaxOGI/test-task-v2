import 'reflect-metadata';
import { container } from 'tsyringe';
import { AuthService } from '../AuthService';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = container.resolve(AuthService);
    localStorage.clear();
  });

  it('should initialize with auth state based on localStorage', () => {
    localStorage.setItem('auth', 'true');
    authService = new AuthService();
    expect(authService.getAuthState()).toBe(true);

    localStorage.removeItem('auth');
    authService = new AuthService();
    expect(authService.getAuthState()).toBe(false);
  });

  it('should set auth state to true on successful login', () => {
    authService.login('user', 'password');
    expect(authService.getAuthState()).toBe(true);
    expect(localStorage.getItem('auth')).toBe('true');
  });

  it('should set auth state to false on failed login', () => {
    authService.login('user', 'wrongpassword');
    expect(authService.getAuthState()).toBe(false);
    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should remove auth state on logout', () => {
    authService.login('user', 'password');
    expect(authService.getAuthState()).toBe(true);

    authService.logout();
    expect(authService.getAuthState()).toBe(false);
    expect(localStorage.getItem('auth')).toBeNull();
  });

  it('should return an observable for auth state', () => {
    return new Promise<void>((resolve) => {
      authService.isAuthenticated().subscribe((state) => {
        expect(state).toBe(false);
        resolve();
      });
    });
  });

  it('should update auth state when logged in', () => {
    return new Promise<void>((resolve) => {
      const authStates: boolean[] = [];
      const subscription = authService.isAuthenticated().subscribe((state) => {
        authStates.push(state);
        if (authStates.length === 3) {
          expect(authStates).toEqual([false, true, false]);
          subscription.unsubscribe();
          resolve();
        }
      });
      authService.login('user', 'password');
      authService.logout();
    });
  });
});
