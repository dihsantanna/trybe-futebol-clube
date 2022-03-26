import { Router } from 'express';
import * as injectors from '../helpers/injectors';
import Validator from '../validations';

const validator = new Validator();

const loginController = injectors.login();

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
