import { BehaviorSubject } from 'rxjs';

class AuthService {
  private authState = new BehaviorSubject<boolean>(false);

  login(username: string, password: string): void {
    // Мокаем аутентификацию
    if (username === 'user' && password === 'password') {
      this.authState.next(true);
    }
  }

  logout(): void {
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.asObservable();
  }
}

export const authService = new AuthService();
