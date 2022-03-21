import { Router } from 'express';
import { Service } from 'typedi';
import { LoginController } from './database/controllers';

@Service()
export default class Routes {
  private _routes: Router;

  constructor(
    private _loginController: LoginController,
  ) {
    this._routes = Router();
    this._mountRoutes();
  }

  private _login() {
    this._routes.post(
      '/login',
      this._loginController.login,
    );
  }

  private _mountRoutes() {
    this._login();
  }

  get routes() {
    return this._routes;
  }
}
