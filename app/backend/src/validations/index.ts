import { Request, Response, NextFunction } from 'express';
import * as sequelize from 'sequelize';
import Clubs from '../database/models/clubs';
import Schemas from './schemas';
import code from '../environments/statusCode';
import HandlerToken from '../utils/handlerToken';
import { msgs } from '../environments';
import { IVerifyError } from '../interfaces';

const handlerToken = new HandlerToken();

const { Op } = sequelize;

export default class Validator {
  private _teamsExists = async (team1: number, team2: number) => {
    const { count } = await Clubs.findAndCountAll({
      where: {
        [Op.or]: [{ id: team1 }, { id: team2 }],
      },
    });

    return count === 2;
  };

  login = (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = Schemas.LoginSchema.validate(body);
    if (error) return res.status(code.UNAUTHORIZED).json({ message: error.message });
    next();
  };

  token = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(code.UNAUTHORIZED).json(msgs.TOKEN_REQUIRED);
    const { error } = await handlerToken.verify(authorization) as IVerifyError;
    if (error) return res.status(code.UNAUTHORIZED).json(msgs.TOKEN_INVALID);
    next();
  };

  matchs = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    const { homeTeam, awayTeam } = body;

    if (homeTeam === awayTeam) return res.status(code.UNAUTHORIZED).json(msgs.EQUAL_TEAMS);

    if (!(await this._teamsExists(homeTeam, awayTeam))) {
      return res.status(code.UNAUTHORIZED).json(msgs.TEAM_NOT_FOUND);
    }

    next();
  };
}
