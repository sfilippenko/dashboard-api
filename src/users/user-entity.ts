import { hash, compare } from 'bcryptjs';

export class User {
  private _password: string;

  constructor(
    private readonly _email: string,
    private readonly _name: string,
    private readonly passwordHash?: string,
  ) {
    if (passwordHash) {
      this._password = passwordHash;
    }
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  async setPassword(password: string, salt: number) {
    this._password = await hash(password, salt);
  }

  async comparePasswords(password: string) {
    return compare(password, this._password);
  }
}
