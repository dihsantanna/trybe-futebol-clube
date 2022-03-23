import { Service } from 'typedi';
import * as Repository from '../repositories';
import code from '../../environments/statusCode';
import HandlerToken from '../../utils/handlerToken';
import msgs from '../../environments/msgsError';
import camelizeKeys from '../../utils/camelizeKeys';

@Service()
export default class ClubsService {
  constructor(
    readonly clubsRepository: Repository.Clubs,
    readonly handlerToken = HandlerToken,
  ) {}

  getAll = async () => {
    const { clubsRepository } = this;
    const clubs = await clubsRepository.findAll();
    return { code: code.OK, result: camelizeKeys(clubs) };
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
