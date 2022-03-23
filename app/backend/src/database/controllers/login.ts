import { Response, Request } from 'express';
import { Service } from 'typedi';
import * as Services from '../services';

@Service()
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
