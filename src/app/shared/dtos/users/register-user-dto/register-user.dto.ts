import { Email } from 'src/app/shared/models/email/email';

export class RegisterUserDTO {
  name: string = '';

  email: Email = new Email();

  password: string = '';

  role?: string = 'CUSTOMER';
}
