import IMatchs from './IMatchs';
import IClubName from './IClubName';

interface IMatchsAndClubNames extends IMatchs {
  homeClub: IClubName;
  awayClub: IClubName;
}

export default IMatchsAndClubNames;
