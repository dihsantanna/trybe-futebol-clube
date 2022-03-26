import { Response, Request } from 'express';
import * as Services from '../services';

export default class ClubsController {
  constructor(
    readonly clubsService: Services.Clubs,
  ) {}

  getAll = async (_req: Request, res: Response) => {
    const { clubsService } = this;
    const { code, result } = await clubsService.getAll();
    res.status(code).json(result);
  };

  getById = async (req: Request, res: Response) => {
    const { clubsService } = this;
    const { id } = req.params;
    const { code, result } = await clubsService.getById(id as string);
    res.status(code).json(result);
  };
}
