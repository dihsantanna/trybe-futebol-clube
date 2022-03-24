import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import * as Schemas from './schemas';
import code from '../environments/statusCode';
import HandlerToken from '../utils/handlerToken';
import { msgs } from '../environments';
import { IVerifyError } from '../interfaces';

@Service()
export default class Validator {
  login = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = Schemas.LoginSchema.validate(body);
    if (error) return res.status(code.UNAUTHORIZED).json({ message: error.message });
    next();
  };

  token = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(code.UNAUTHORIZED).json(msgs.TOKEN_REQUIRED);
    const { error } = await HandlerToken.verify(authorization) as IVerifyError;
    if (error) res.status(code.UNAUTHORIZED).json(msgs.TOKEN_INVALID);

    next();
  };
}
