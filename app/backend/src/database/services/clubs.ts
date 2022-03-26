import * as Repository from '../repositories';
import code from '../../environments/statusCode';
import msgs from '../../environments/msgsError';

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
      return { code: code.BAD_REQUEST, result: msgs.TEAM_NOT_FOUND };
    }

    return { code: code.OK, result: club };
  };
}
