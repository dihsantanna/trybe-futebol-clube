import jwt = require('jsonwebtoken');
import { readFile } from 'fs/promises';
import { Service } from 'typedi';
import { IUser, IVerifyError } from '../interfaces';

@Service()
class HandlerToken {
  constructor(
    private _secret: Promise<string> = readFile('jwt.evaluation.key', 'utf8'),
  ) {}

  generate = async (user: IUser) => {
    const { id, email, username, role } = user;
    const payload = { id, email, username, role };
    return jwt.sign(payload, (await this._secret).trim(), { expiresIn: '7d' });
  };

  verify = async (token: string) => {
    let result: unknown;
    jwt.verify(token, (await this._secret).trim(), (error, decoded) => {
      result = { error, ...decoded };
    });

    return result as IVerifyError | IUser;
  };
}

export default new HandlerToken();
