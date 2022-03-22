import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import * as Schemas from './schemas';
import code from '../environments/statusCode';

@Service()
export default class Validator {
  login = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = Schemas.LoginSchema.validate(body);
    if (error) return res.status(code.UNAUTHORIZED).json({ message: error.message });
    next();
  };
}
