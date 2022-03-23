import { Response, Request } from 'express';
import { Service } from 'typedi';
import { LoginService } from '../services';

@Service()
export default class LoginController {
  constructor(
    readonly loginService: LoginService,
  ) {}

  login = async (req: Request, res: Response) => {
    const { body } = req;
    const { code, result } = await this.loginService.login(body);
    res.status(code).json(result);
  };

  validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { code, result } = await this.loginService.validate(authorization as string);
    res.status(code).json(result);
  };
}
