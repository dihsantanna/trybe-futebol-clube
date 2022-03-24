import { Service } from 'typedi';
import * as Repository from '../repositories';
import code from '../../environments/statusCode';
import msgs from '../../environments/msgsError';

@Service()
export default class ClubsService {
  constructor(
    readonly clubsRepository: Repository.Clubs,
  ) {}

  getAll = async () => {
    const { clubsRepository } = this;
    const clubs = await clubsRepository.findAll();
    return { code: code.OK, result: clubs };
  };

  getById = async (id: string) => {
    const { clubsRepository } = this;
    const club = await clubsRepository.findById(Number(id));

    if (!club) {
      return { code: code.BAD_REQUEST, result: msgs.CLUB_NOT_EXISTS };
    }

    return { code: code.OK, result: club };
  };
}
