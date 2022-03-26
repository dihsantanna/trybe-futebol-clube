import { Response, Request } from 'express';
import * as Services from '../services';

export default class LoginController {
  constructor(
    readonly loginService: Services.Login,
  ) {}

  login = async (req: Request, res: Response) => {
    const { loginService } = this;
    const { body } = req;
    const { code, result } = await loginService.login(body);
    res.status(code).json(result);
  };

  validate = async (req: Request, res: Response) => {
    const { loginService } = this;
    const { authorization } = req.headers;
    const { code, result } = await loginService.validate(authorization as string);
    res.status(code).json(result);
  };
}
