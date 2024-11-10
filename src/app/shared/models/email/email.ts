export class Email {
  value: string = '';

  otp: string = '';

  verified?: boolean = true;

  constructor(email?: { [key: string]: any }) {
    if (email) {
      this.value = email['value'] || '';

      this.otp = email['otp'] || '';

      if (
        String(email['verified']) === 'true' ||
        String(email['verified']) === 'false'
      ) {
        this.verified = String(email['verified']) === 'true';
      }
    }
  }
}
