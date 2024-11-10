import { User } from './user';

export class Users {
  currentCount: number = 0;
  totalCount: number = 0;
  users: User[] = [];

  constructor(users?: { [key: string]: any }) {
    if (users) {
      if (!isNaN((users['currentCount'] = parseInt(users['currentCount'])))) {
        this.currentCount = users['currentCount'];
      }

      if (!isNaN((users['totalCount'] = parseInt(users['totalCount'])))) {
        this.totalCount = users['totalCount'];
      }

      if (users['users']?.length) {
        for (let i = 0; i < users['users'].length; i++) {
          this.users.push(new User(users['users'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.users.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.users.length;
        }
      }
    }
  }

  getById(userId: string): User | null {
    for (let user of this.users) {
      if (user.userId === userId) {
        return user;
      }
    }

    return null;
  }

  add(user: User) {
    this.users.push(user);
    this.currentCount++;
    this.totalCount++;
  }
}
