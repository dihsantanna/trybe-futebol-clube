import { Service } from 'typedi';
import * as Repository from '../repositories';
import code from '../../environments/statusCode';

@Service()
export default class MatchsService {
  constructor(
    readonly matchsRepository: Repository.Matchs,
  ) {}

  getAll = async () => {
    const { matchsRepository } = this;
    const matchs = await matchsRepository.findAll();
    return { code: code.OK, result: matchs };
  };

  getByInProgress = async (inProgress: boolean) => {
    const { matchsRepository } = this;
    const matchs = await matchsRepository.findByInProgress(inProgress);

    return { code: code.OK, result: matchs };
  };
}
