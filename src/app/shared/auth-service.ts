export interface User {
  uid: string;
  email: string;
  displayName: string;
}

export abstract class AuthService {
  abstract isAuth(): boolean;

  abstract isAdmin(): boolean;

  abstract getUser(): User;

  abstract login(loginMethod: string): Promise<any>;

  abstract logout();

}
