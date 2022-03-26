import { Router } from 'express';
import { Container } from 'typedi';
import * as Controllers from '../database/controllers';
import Validator from '../validations';

const validator = new Validator();

const matchsController = Container.get(Controllers.Matchs);

const route = Router();

route.get(
  '/',
  matchsController.getAll,
  matchsController.getByInProgress,
);

route.post(
  '/',
  validator.token,
  validator.matchs,
  matchsController.create,
);

route.patch(
  '/:id/finish',
  validator.token,
  matchsController.finish,
);

export default route;
