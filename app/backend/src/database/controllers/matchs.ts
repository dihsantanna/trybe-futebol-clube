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
    return res.status(code).json(result);
  };

  getByInProgress = async (req: Request, res: Response) => {
    const { matchsService } = this;
    const { inProgress } = req.query;
    const { code, result } = await matchsService.getByInProgress(inProgress === 'true');
    return res.status(code).json(result);
  };

  create = async (req: Request, res: Response) => {
    const { matchsService } = this;
    const { body } = req;
    const { code, result } = await matchsService.create(body);
    return res.status(code).json(result);
  };

  finish = async (req: Request, res: Response) => {
    const { matchsService } = this;
    const { id } = req.params;
    const { code } = await matchsService.finish(+id);
    return res.status(code).json();
  };

  resultUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { matchsService } = this;
    const { id } = req.params;
    const { body } = req;
    if (!body) return next();
    const { code } = await matchsService.resultUpdate(+id, body);
    return res.status(code).json();
  };
}
