import { Service } from 'typedi';
import Matchs from '../models/matchs';
import Clubs from '../models/clubs';

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
}
