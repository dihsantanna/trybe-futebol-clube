import { Service } from 'typedi';
import Clubs from '../models/clubs';

@Service()
export default class ClubsRepository {
  findAll = async () => {
    const result = await Clubs.findAll();
    return result;
  };

  findById = async (id: number) => {
    const result = await Clubs.findByPk(id);
    return result;
  };
}
