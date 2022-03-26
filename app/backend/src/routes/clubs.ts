import { Router } from 'express';
import * as injectors from '../helpers/injectors';

const clubsController = injectors.clubs();

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
