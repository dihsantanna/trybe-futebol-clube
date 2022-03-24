import { Router } from 'express';
import { Service } from 'typedi';
import * as Controllers from './database/controllers';
import Validator from './validations';

@Service()
export default class Routes {
  private _routes: Router;

  constructor(
    readonly loginController: Controllers.Login,
    readonly clubsController: Controllers.Clubs,
    readonly matchsController: Controllers.Matchs,
    readonly validator: Validator,
  ) {
    this._routes = Router();
    this._mountRoutes();
  }

  private _login() {
    const { validator, loginController, _routes: route } = this;
    route.post(
      '/login',
      validator.login,
      loginController.login,
    );

    route.get(
      '/login/validate',
      loginController.validate,
    );
  }

  private _clubs() {
    const { clubsController, _routes: route } = this;
    route.get(
      '/clubs',
      clubsController.getAll,
    );

    route.get(
      '/clubs/:id',
      clubsController.getById,
    );
  }

  private _matchs() {
    const { matchsController, _routes: route, validator } = this;
    route.get(
      '/matchs',
      matchsController.getAll,
      matchsController.getByInProgress,
    );

    route.post(
      '/matchs',
      validator.token,
      validator.matchs,
      matchsController.create,
    );
  }

  private _mountRoutes() {
    this._login();
    this._clubs();
    this._matchs();
  }

  get routes() {
    return this._routes;
  }
}
