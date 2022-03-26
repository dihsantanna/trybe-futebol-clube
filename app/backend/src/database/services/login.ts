import bcrypt = require('bcryptjs');
import * as Repository from '../repositories';
import { ILogin, ILoginResponse, IUser, IVerifyError } from '../../interfaces';
import code from '../../environments/statusCode';
import HandlerToken from '../../utils/handlerToken';
import msgs from '../../environments/msgsError';

export default class LoginService {
  constructor(
    readonly loginRepository: Repository.Login,
    readonly handlerToken: HandlerToken,
  ) {}

  login = async ({ email, password }: ILogin) => {
    const { handlerToken, loginRepository } = this;
    const user = await loginRepository.findUser(email) as IUser;
    if (!!user && await bcrypt.compare(password, user.password)) {
      const { id, username, role } = user;
      const token = await handlerToken.generate(user);
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
    const { handlerToken, loginRepository } = this;
    const payload = await handlerToken.verify(token);

    if ((payload as IVerifyError).error) {
      return { code: code.UNAUTHORIZED, result: msgs.TOKEN_INVALID };
    }

    const user = await loginRepository.findUserById((payload as IUser).id);

    if (!user) return { code: code.UNAUTHORIZED, result: msgs.TOKEN_INVALID };

    return { code: code.OK, result: user.role };
  };
}
