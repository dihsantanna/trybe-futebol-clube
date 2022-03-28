import { IInfoTeams, IMatchsAndClubNames } from '../../interfaces';
import * as Repository from '../repositories';
import { StatusCode as code } from '../../environments';

const initialInfos = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 100,
};

export default class LeaderBoardsService {
  constructor(
    readonly matchsRepository: Repository.Matchs,
    readonly clubsRepository: Repository.Clubs,
  ) {}

  readonly sortByGoalsOwn = (a: IInfoTeams, b: IInfoTeams) => {
    const goalsOwnEqual = a.goalsOwn === b.goalsOwn;
    const goalsOwnMin = a.goalsOwn - b.goalsOwn;
    return goalsOwnEqual ? 0 : goalsOwnMin;
  };

  readonly sortByGoalsFavor = (a: IInfoTeams, b: IInfoTeams) => {
    const { sortByGoalsOwn } = this;
    const goalsFavorEqual = a.goalsFavor === b.goalsFavor;
    const goalsFavorMin = b.goalsFavor - a.goalsFavor;
    return goalsFavorEqual ? sortByGoalsOwn(a, b) : goalsFavorMin;
  };

  readonly sortByGoalsBalance = (a: IInfoTeams, b: IInfoTeams) => {
    const { sortByGoalsFavor } = this;
    const goalsBalanceEqual = a.goalsBalance === b.goalsBalance;
    const goalsBalanceMin = b.goalsBalance - a.goalsBalance;
    return goalsBalanceEqual ? sortByGoalsFavor(a, b) : goalsBalanceMin;
  };

  readonly sortByTotalVictories = (a: IInfoTeams, b: IInfoTeams) => {
    const { sortByGoalsBalance } = this;
    const pointsEqual = a.totalVictories === b.totalVictories;
    const pointsMin = b.totalVictories - a.totalVictories;
    return pointsEqual ? sortByGoalsBalance(a, b) : pointsMin;
  };

  readonly sortByTotalPoints = (a: IInfoTeams, b: IInfoTeams) => {
    const { sortByTotalVictories } = this;
    const pointsEqual = a.totalPoints === b.totalPoints;
    const pointsMin = b.totalPoints - a.totalPoints;
    return pointsEqual ? sortByTotalVictories(a, b) : pointsMin;
  };

  readonly sortRules = (a: IInfoTeams, b: IInfoTeams) => {
    const { sortByTotalPoints } = this;
    return sortByTotalPoints(a, b);
  };

  readonly calcPoints = (num1: number, num2: number) => {
    if (num1 === num2) return 1;

    if (num1 > num2) return 3;

    return 0;
  };

  readonly efficiency = (points: number, games: number) => +(
    (points / (games * 3)) * 100
  ).toFixed(2);

  readonly statisticsHomeTeam = (acc: IInfoTeams, curr: IMatchsAndClubNames) => {
    const { calcPoints, efficiency } = this;
    const points = calcPoints(curr.homeTeamGoals, curr.awayTeamGoals);
    acc.totalPoints += points;
    acc.totalGames += 1;
    acc.totalVictories += points === 3 ? 1 : 0;
    acc.totalDraws += points === 1 ? 1 : 0;
    acc.totalLosses += points === 0 ? 1 : 0;
    acc.goalsFavor += curr.homeTeamGoals;
    acc.goalsOwn += curr.awayTeamGoals;
    acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
    acc.efficiency = efficiency(acc.totalPoints, acc.totalGames);
  };

  readonly statisticsAwayTeam = (acc: IInfoTeams, curr: IMatchsAndClubNames) => {
    const { calcPoints, efficiency } = this;
    const points = calcPoints(curr.awayTeamGoals, curr.homeTeamGoals);
    acc.totalPoints += points;
    acc.totalGames += 1;
    acc.totalVictories += points === 3 ? 1 : 0;
    acc.totalDraws += points === 1 ? 1 : 0;
    acc.totalLosses += points === 0 ? 1 : 0;
    acc.goalsFavor += curr.awayTeamGoals;
    acc.goalsOwn += curr.homeTeamGoals;
    acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
    acc.efficiency = efficiency(acc.totalPoints, acc.totalGames);
  };

  leaderBoard = async () => {
    const { matchsRepository } = this;
    const { clubsRepository, statisticsHomeTeam, statisticsAwayTeam, sortRules } = this;
    const matchs = await matchsRepository.findAll() as unknown as IMatchsAndClubNames[];
    const clubs = await clubsRepository.findAll();
    const result = clubs.map(({ id, clubName }) => matchs.reduce((acc, curr) => {
      if (curr.homeTeam === id) statisticsHomeTeam(acc, curr);
      if (curr.awayTeam === id) statisticsAwayTeam(acc, curr);
      return acc;
    }, { ...initialInfos, name: clubName }));

    result.sort(sortRules);

    return { code: code.OK, result };
  };

  homeTeamsRank = async () => {
    const { matchsRepository } = this;
    const { clubsRepository, statisticsHomeTeam, sortRules } = this;
    const [matchs, clubs] = await Promise
      .all([matchsRepository.findAll() as unknown as IMatchsAndClubNames[],
        clubsRepository.findAll()]);
    const result = clubs.map(({ id, clubName }) => matchs.reduce((acc, curr) => {
      if (curr.homeTeam === id) statisticsHomeTeam(acc, curr);
      acc.name = clubName;
      return acc;
    }, { ...initialInfos, name: clubName }));

    result.sort(sortRules);

    return { code: code.OK, result };
  };

  awayTeamsRank = async () => {
    const { matchsRepository } = this;
    const { clubsRepository, statisticsAwayTeam, sortRules } = this;
    const matchs = await matchsRepository.findAll() as unknown as IMatchsAndClubNames[];
    const clubs = await clubsRepository.findAll();
    const result = clubs.map(({ id, clubName }) => matchs.reduce((acc, curr) => {
      if (curr.awayTeam === id) statisticsAwayTeam(acc, curr);
      acc.name = clubName;
      return acc;
    }, { ...initialInfos, name: clubName }));

    result.sort(sortRules);

    return { code: code.OK, result };
  };
}
