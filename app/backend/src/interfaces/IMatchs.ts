import IMatchsResult from './IMatchsResult';

interface IMatchs extends IMatchsResult {
  homeTeam: number,
  awayTeam: number,
  inProgress: boolean,
}

export default IMatchs;
