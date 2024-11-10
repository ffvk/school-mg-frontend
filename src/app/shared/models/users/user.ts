import { Email } from '../email/email';
import { Token } from '../tokens/token';
import { UserRoleEnum } from '../../settings/app-settings';
import { RegisterUserDTO } from '../../dtos/users/register-user-dto/register-user.dto';
import { UpdateUserDTO } from '../../dtos/users/update-user-dto/update-user.dto';

import { LoginUserDTO } from '../../dtos/users/login-user-dto/login-user.dto';
import { Password } from './password/password';

export class User {
  userId: string = '';

  name: string = '';

  email: Email = new Email();

  role: keyof typeof UserRoleEnum = 'ADMIN';

  password: Password = new Password();

  wasNew: boolean = true;

  tokens?: Token[] = [];

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(user?: { [key: string]: any }) {
    if (user) {
      this.userId = user['userId'] || user['_id'] || '';

      this.name = user['name'] || '';

      if (user['email']) {
        this.email = new Email(user['email']);
      }

      this.role = user['role'] || '';

      if (user['password']) {
        this.password = new Password(user['password']);
      }

      if (
        String(user['wasNew']) === 'true' ||
        String(user['wasNew']) === 'false'
      ) {
        this.wasNew = String(user['wasNew']) === 'true';
      }

      this.tokens = [];
      if (user['tokens']) {
        for (let token of user['tokens']) {
          this.tokens.push(new Token(token));
        }
      }
    }
  }

  toLoginUserDTO(): LoginUserDTO {
    return {
      emailValue: this.email.value,
      password: this.password.plain,
    };
  }

  toRegisterDTO(): RegisterUserDTO {
    return {
      name: this.name,
      email: this.email,
      password: this.password.plain,
      role: this.role,
    };
  }

  toUpdateDTO(): UpdateUserDTO {
    return {
      userId: this.userId,
      name: this.name,
    };
  }
}
