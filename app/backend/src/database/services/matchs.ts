import { Service } from 'typedi';
import { IMatchs, IMatchsResult } from '../../interfaces';
import * as Repository from '../repositories';
import code from '../../environments/statusCode';

@Service()
export default class MatchsService {
  constructor(
    readonly matchsRepository: Repository.Matchs,
  ) {}

  getAll = async () => {
    const { matchsRepository } = this;
    const result = await matchsRepository.findAll();
    return { code: code.OK, result };
  };

  getByInProgress = async (inProgress: boolean) => {
    const { matchsRepository } = this;
    const result = await matchsRepository.findByInProgress(inProgress);

    return { code: code.OK, result };
  };

  create = async (match: IMatchs) => {
    const { matchsRepository } = this;
    const result = await matchsRepository.create(match);

    return { code: code.CREATED, result };
  };

  finish = async (id: number) => {
    const { matchsRepository } = this;
    const [result] = await matchsRepository.finish(id);
    return { code: result ? code.OK : code.BAD_REQUEST };
  };

  resultUpdate = async (id: number, results: IMatchsResult) => {
    const { matchsRepository } = this;
    const [result] = await matchsRepository.resultUpdate(id, results);
    return { code: result ? code.OK : code.BAD_REQUEST };
  };
}
