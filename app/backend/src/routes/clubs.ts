import { Router } from 'express';
import { Container } from 'typedi';
import * as Controllers from '../database/controllers';

const clubsController = Container.get(Controllers.Clubs);

const route = Router();

route.get(
  '/',
  clubsController.getAll,
);

route.get(
  '/:id',
  clubsController.getById,
);

export default route;
