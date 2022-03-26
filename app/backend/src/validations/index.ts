import { Request, Response, NextFunction } from 'express';
import * as sequelize from 'sequelize';
import { Service } from 'typedi';
import Clubs from '../database/models/clubs';
import * as Schemas from './schemas';
import code from '../environments/statusCode';
import HandlerToken from '../utils/handlerToken';
import { msgs } from '../environments';
import { IVerifyError } from '../interfaces';

const { Op } = sequelize;

@Service()
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
    const { error } = await HandlerToken.verify(authorization) as IVerifyError;
    if (error) return res.status(code.UNAUTHORIZED).json(msgs.TOKEN_INVALID);
    next();
  };

  matchs = async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = Schemas.MatchsSchema.validate(body);

    if (error) return res.status(code.BAD_REQUEST).json({ message: error.message });

    const { homeTeam, awayTeam } = body;

    if (homeTeam === awayTeam) return res.status(code.UNAUTHORIZED).json(msgs.EQUAL_TEAMS);

    if (!(await this._teamsExists(homeTeam, awayTeam))) {
      return res.status(code.UNAUTHORIZED).json(msgs.TEAM_NOT_FOUND);
    }

    next();
  };
}
