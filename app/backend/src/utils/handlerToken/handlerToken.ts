import jwt = require('jsonwebtoken');
import { readFile } from 'fs/promises';
import { Service } from 'typedi';
import { IUser, IVerifyError } from '../../interfaces';

@Service()
export default class HandlerToken {
  static readonly secret: Promise<string> = readFile('jwt.evaluation.key', 'utf8');

  static generate = async (user: IUser) => {
    const { id, email, username, role } = user;
    const payload = { id, email, username, role };
    return jwt.sign(payload, (await HandlerToken.secret).trim(), { expiresIn: '7d' });
  };

  static verify = async (token: string) => {
    let result: unknown;

    jwt.verify(token, (await HandlerToken.secret).trim(), (error, decoded) => {
      const value = decoded as IUser;
      result = { error, ...value } as typeof result;
    });

    return result as IVerifyError | IUser;
  };
}
