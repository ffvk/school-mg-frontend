import { CreateTokenDTO } from '../../dtos/tokens/create-token-dto/create-token.dto';
import { UpdateTokenDTO } from '../../dtos/tokens/update-token-dto/update-token.dto';
import { Permission } from '../permissions/permission';

export class Token {
  tokenId: string = '';

  userId: string = '';

  name: string = '';

  hash: string = '';

  expiry: number = 0;

  permissions: Permission[] = [];

  description?: string = '';

  disabled: boolean = false;

  timestamp?: { createdAt: number; updatedAt: number };

  constructor(token?: { [key: string]: any }) {
    if (token) {
      this.tokenId = token['tokenId'] || token['_id'] || '';

      this.userId = token['userId'] || '';

      this.name = token['name'] || '';

      this.hash = token['hash'] || '';

      this.description = token['description'] || '';

      if (!isNaN((token['expiry'] = parseInt(token['expiry'])))) {
        this.expiry = token['expiry'];
      }

      if (
        String(token['disabled']) === 'true' ||
        String(token['disabled']) === 'false'
      ) {
        this.disabled = String(token['disabled']) === 'true';
      }

      this.timestamp = token['timestamp'] || {
        createdAt: null,
        updatedAt: null,
      };
    }
  }

  toCreateDTO(): CreateTokenDTO {
    return {
      userId: this.userId,
      name: this.name,
      description: this.description,
      expiry: this.expiry,
    };
  }

  toUpdateDTO(): UpdateTokenDTO {
    return {
      tokenId: this.tokenId,
      name: this.name,
      description: this.description,
      expiry: this.expiry,
      disabled: this.disabled,
    };
  }
}
