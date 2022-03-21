import bcrypt = require('bcryptjs');
import { Service } from 'typedi';
import { LoginRepository } from '../repositories';
import { ILogin, ILoginResponse, IUser } from '../../interfaces';
import code from '../../environments/statusCode';
import generateToken from '../../utils/generateToken';
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
      const token = await generateToken(user);
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
}
