import bcrypt = require('bcryptjs');
import { ILogin, ILoginResponse, IUser } from '../../../interfaces';
import Users from '../../models/users';
import code from '../../../environments/statusCode';
import generateToken from '../../../utils/generateToken';

export default class LoginService {
  static login = async ({ email, password }: ILogin) => {
    const user = await Users.findOne({ where: { email } }) as IUser;
    if (await bcrypt.compare(password, user.password)) {
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
    return { code: 400, result: '' };
  };
}
