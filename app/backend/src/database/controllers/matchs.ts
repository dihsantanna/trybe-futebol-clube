import { Response, Request, NextFunction } from 'express';
import { Service } from 'typedi';
import * as Services from '../services';

@Service()
export default class MatchsController {
  constructor(
    readonly matchsService: Services.Matchs,
  ) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.inProgress) return next();
    const { matchsService } = this;
    const { code, result } = await matchsService.getAll();
    res.status(code).json(result);
  };

  getByInProgress = async (req: Request, res: Response) => {
    const { matchsService } = this;
    const { inProgress } = req.query;
    const { code, result } = await matchsService.getByInProgress(inProgress === 'true');
    res.status(code).json(result);
  };
}
