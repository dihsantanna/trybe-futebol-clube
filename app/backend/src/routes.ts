import { Router } from 'express';
import LoginController from './database/controllers/login';

export default class Routes {
  private _routes: Router;

  constructor() {
    this._routes = Router();
    this._mountRoutes();
  }

  private _login() {
    this._routes.post(
      '/login',
      LoginController.login,
    );
  }

  private _mountRoutes() {
    this._login();
  }

  get routes() {
    return this._routes;
  }
}
