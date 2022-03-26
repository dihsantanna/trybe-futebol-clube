import { Router } from 'express';
import { Container } from 'typedi';
import * as Controllers from '../database/controllers';
import Validator from '../validations';

const validator = new Validator();

const loginController = Container.get(Controllers.Login);

const route = Router();

route.post(
  '/',
  validator.login,
  loginController.login,
);

route.get(
  '/validate',
  loginController.validate,
);

export default route;
