export class Password {
  hash: string = '';

  plain: string = '';

  otp?: string = '';

  constructor(password?: { [key: string]: any }) {
    if (password) {
      this.hash = password['hash'] || '';

      this.otp = password['otp'] || '';

      this.plain = password['plain'] || '';

      if (
        String(password['reset']) === 'true' ||
        String(password['reset']) === 'false'
      ) {
      }
    }
  }
}
