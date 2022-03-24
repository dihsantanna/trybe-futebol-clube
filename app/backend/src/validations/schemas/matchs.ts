import * as Joi from 'joi';
import { IMatchs } from '../../interfaces';
import msgs from '../../environments/msgsError';

const matchsSchema = Joi.object<IMatchs>({
  homeTeam: Joi.number().integer().required().messages({
    'any.required': msgs.ALL_FIELD_REQUIRED.message,
  }),
  homeTeamGoals: Joi.number().integer().required().messages({
    'any.required': msgs.ALL_FIELD_REQUIRED.message,
  }),
  awayTeam: Joi.number().integer().required().messages({
    'any.required': msgs.ALL_FIELD_REQUIRED.message,
  }),
  awayTeamGoals: Joi.number().integer().required().messages({
    'any.required': msgs.ALL_FIELD_REQUIRED.message,
  }),
  inProgress: Joi.boolean().required().messages({
    'any.required': msgs.ALL_FIELD_REQUIRED.message,
  }),
});

export default matchsSchema;
