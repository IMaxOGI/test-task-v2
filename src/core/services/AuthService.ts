import { injectable } from 'tsyringe';
import { BehaviorSubject } from 'rxjs';

@injectable()
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);

  login(username: string, password: string): void {
    if (username === 'user' && password === 'password') {
      this.authState.next(true);
    } else {
      this.authState.next(false);
    }
  }

  logout(): void {
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.asObservable();
  }

  getAuthState(): boolean {
    return this.authState.getValue();
  }
}
