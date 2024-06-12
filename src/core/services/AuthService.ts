import { injectable } from 'tsyringe';
import { BehaviorSubject, Observable } from 'rxjs';

@injectable()
export class AuthService {
  private authState = new BehaviorSubject<boolean>(this.hasSession());

  private hasSession(): boolean {
    return !!localStorage.getItem('auth');
  }

  login(username: string, password: string): void {
    if (username === 'user' && password === 'password') {
      localStorage.setItem('auth', 'true');
      this.authState.next(true);
    } else {
      this.authState.next(false);
    }
  }

  logout(): void {
    localStorage.removeItem('auth');
    this.authState.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authState.asObservable();
  }

  getAuthState(): boolean {
    return this.authState.getValue();
  }
}
