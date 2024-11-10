import { Token } from './token';

export class Tokens {
  currentCount: number = 0;
  totalCount: number = 0;
  tokens: Token[] = [];

  constructor(tokens?: { [key: string]: any }) {
    if (tokens) {
      if (!isNaN((tokens['currentCount'] = parseInt(tokens['currentCount'])))) {
        this.currentCount = tokens['currentCount'];
      }

      if (!isNaN((tokens['totalCount'] = parseInt(tokens['totalCount'])))) {
        this.totalCount = tokens['totalCount'];
      }

      if (tokens['tokens']?.length) {
        for (let i = 0; i < tokens['tokens'].length; i++) {
          this.tokens.push(new Token(tokens['tokens'][i]));
        }

        if (!this.currentCount) {
          this.currentCount = this.tokens.length;
        }

        if (!this.totalCount) {
          this.totalCount = this.tokens.length;
        }
      }
    }
  }

  getById(tokenId: string): Token | null {
    for (let token of this.tokens) {
      if (token.tokenId === tokenId) {
        return token;
      }
    }

    return null;
  }

  add(token: Token) {
    this.tokens.push(token);
    this.currentCount++;
    this.totalCount++;
  }
}
