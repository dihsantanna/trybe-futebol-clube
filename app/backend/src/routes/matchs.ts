import { Router } from 'express';
import * as injectors from '../helpers/injectors';
import Validator from '../validations';

const validator = new Validator();

const matchsController = injectors.matchs();

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

route.patch(
  '/:id/',
  validator.token,
  matchsController.resultUpdate,
  matchsController.finish,
);

export default route;
