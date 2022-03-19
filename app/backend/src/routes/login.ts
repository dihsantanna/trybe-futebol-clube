import { Router } from 'express';
import LoginController from '../database/controllers/login';

const route = Router();

route.post(
  '/',
  LoginController.login,
);

export default route;
