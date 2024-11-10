export class CreateTokenDTO {
  userId: string = '';

  name: string = '';

  expiry: number = 0;

  description?: string = '';
}
