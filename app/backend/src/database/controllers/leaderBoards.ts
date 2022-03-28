import { Response, Request } from 'express';
import * as Services from '../services';

export default class LeaderBoardsController {
  constructor(
    readonly leaderBoardServices: Services.LeaderBoards,
  ) {}

  homeTeamsRank = async (_req: Request, res: Response) => {
    const { leaderBoardServices } = this;
    const { code, result } = await leaderBoardServices.homeTeamsRank();
    return res.status(code).json(result);
  };

  awayTeamsRank = async (_req: Request, res: Response) => {
    const { leaderBoardServices } = this;
    const { code, result } = await leaderBoardServices.awayTeamsRank();
    return res.status(code).json(result);
  };

  leaderBoard = async (_req: Request, res: Response) => {
    const { leaderBoardServices } = this;
    const { code, result } = await leaderBoardServices.leaderBoard();
    return res.status(code).json(result);
  };
}
