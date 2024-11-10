export class GetTokensDTO {
  tokenId?: string;

  tokenIds?: string;

  userId?: string;

  name?: string;

  hash?: string;

  expiry?: number;

  description?: string;

  disabled?: boolean;

  limit?: number;

  page?: number;

  fields?: string;

  sort?: string;

  search?: string;

  populate?: string;
}
