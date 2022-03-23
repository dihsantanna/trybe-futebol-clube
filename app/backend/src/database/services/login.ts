import bcrypt = require('bcryptjs');
import { Service } from 'typedi';
import { LoginRepository } from '../repositories';
import { ILogin, ILoginResponse, IUser, IVerifyError } from '../../interfaces';
import code from '../../environments/statusCode';
import HandlerToken from '../../utils/handlerToken';
import msgs from '../../environments/msgsError';

@Service()
export default class LoginService {
  constructor(
    readonly loginRepository: LoginRepository,
  ) {}

  login = async ({ email, password }: ILogin) => {
    const user = await this.loginRepository.findUser(email) as IUser;
    if (!!user && await bcrypt.compare(password, user.password)) {
      const { id, username, role } = user;
      const token = await HandlerToken.generate(user);
      return {
        code: code.OK,
        result: {
          user: { id, username, role, email },
          token,
        } as ILoginResponse,
      };
    }
    return { code: code.UNAUTHORIZED, result: msgs.LOGIN_INCORRECT };
  };

  validate = async (token: string) => {
    const payload = await HandlerToken.verify(token);

    if ((payload as IVerifyError).error) {
      return { code: code.UNAUTHORIZED, result: msgs.TOKEN_INVALID };
    }

    const user = await this.loginRepository.findUserById((payload as IUser).id);

    if (!user) return { code: code.UNAUTHORIZED, result: msgs.TOKEN_INVALID };

    return { code: code.OK, result: user.role };
  };
}
