import { Response, Request, NextFunction } from 'express';
import * as Services from '../services';

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
    const { code, result } = await matchsService.finish(+id);
    return res.status(code).json(result);
  };

  resultUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { matchsService } = this;
    const { id } = req.params;
    const { body } = req;
    if (!body) return next();
    const { code, result } = await matchsService.resultUpdate(+id, body);
    return res.status(code).json(result);
  };
}
