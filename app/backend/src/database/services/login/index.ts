import { ILogin, ILoginResponse, IUser } from '../../../interfaces';
import Users from '../../models/users';
import code from '../../../environments/statusCode';
import generateToken from '../../../utils/generateToken';

export default class LoginService {
  static login = async ({ email, password }: ILogin) => {
    const user = await Users.findOne({ where: { email, password } }) as IUser;
    const { id, username, role } = user;
    return {
      code: code.OK,
      result: {
        user: { id, username, role, email },
        token: await generateToken(user),
      } as ILoginResponse,
    };
  };
}
