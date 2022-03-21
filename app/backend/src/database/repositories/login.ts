import { Service } from 'typedi';
import Users from '../models/users';

@Service()
export default class LoginRepository {
  findUser = async (email: string) => {
    const result = Users.findOne({ where: { email }, raw: true });
    return result;
  };
}