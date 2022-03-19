import { Response, Request } from 'express';
import LoginService from '../../services/login';

export default class LoginController {
  static login = async (req: Request, res: Response) => {
    const { body } = req;
    const { code, result } = await LoginService.login(body);
    res.status(code).json(result);
  };
}
