import jwt = require('jsonwebtoken');
import { readFile } from 'fs/promises';
import { IUser } from '../interfaces';

const secret = readFile('jwt.evaluation.key', 'utf8');

export default async (user: IUser) => {
  const { id, email, username, role } = user;
  const payload = { id, email, username, role };
  return jwt.sign(payload, await secret, { expiresIn: '7d' });
};
