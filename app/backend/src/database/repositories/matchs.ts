import { Service } from 'typedi';
import Matchs from '../models/matchs';
import Clubs from '../models/clubs';
import { IMatchs, IMatchsResult } from '../../interfaces';

@Service()
export default class MatchsRepository {
  findAll = async () => {
    const result = await Matchs.findAll({
      include: [{
        model: Clubs,
        as: 'homeClub',
        attributes: ['clubName'],
      },
      {
        model: Clubs,
        as: 'awayClub',
        attributes: ['clubName'],
      }],
    });
    return result;
  };

  findByInProgress = async (inProgress: boolean) => {
    const result = await Matchs.findAll({
      where: { inProgress },
      include: [{
        model: Clubs,
        as: 'homeClub',
        attributes: ['clubName'],
      },
      {
        model: Clubs,
        as: 'awayClub',
        attributes: ['clubName'],
      }],
    });
    return result;
  };

  create = async (match: IMatchs) => {
    const result = await Matchs.create(match);

    return result;
  };

  finish = async (id: number) => {
    const result = await Matchs.update({ inProgress: false }, { where: { id } });

    return result;
  };

  resultUpdate = async (id: number, { homeTeamGoals, awayTeamGoals }: IMatchsResult) => {
    const result = await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return result;
  };
}
