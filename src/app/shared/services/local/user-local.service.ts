import { Injectable } from '@angular/core';
import { Token } from '../../models/tokens/token';
import { User } from '../../models/users/user';

@Injectable({
  providedIn: 'root',
})
export class UserLocalService {
  private readonly ME_KEY = 'ott-me';

  constructor() {}

  getMe(): User {
    return new User(JSON.parse(localStorage.getItem(this.ME_KEY) || '{}'));
  }

  getMyToken(): Token | undefined {
    const user = this.getMe();
    return user && user.tokens && user.tokens[0];
  }

  saveMe(user: User): void {
    return localStorage.setItem(this.ME_KEY, JSON.stringify(user));
  }

  removeMe() {
    return localStorage.removeItem(this.ME_KEY);
  }
}
