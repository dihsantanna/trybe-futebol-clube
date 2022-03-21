import { Router } from 'express';
import { Service } from 'typedi';
import { LoginController } from './database/controllers';
import Validator from './validates';

@Service()
export default class Routes {
  private _routes: Router;

  constructor(
    readonly loginController: LoginController,
    readonly validator: Validator,
  ) {
    this._routes = Router();
    this._mountRoutes();
  }

  private _login() {
    const { validator, loginController } = this;
    this._routes.post(
      '/login',
      validator.login,
      loginController.login,
    );
  }

  private _mountRoutes() {
    this._login();
  }

  get routes() {
    return this._routes;
  }
}
