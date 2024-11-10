export class UpdateTokenDTO {
  tokenId: string = '';

  name?: string = '';

  expiry?: number = 0;

  description?: string = '';

  disabled?: boolean = false;
}
