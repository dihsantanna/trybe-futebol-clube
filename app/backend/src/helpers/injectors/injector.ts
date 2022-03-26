import HandlerToken from '../../utils/handlerToken';
import * as Controller from '../../database/controllers';
import * as Service from '../../database/services';
import * as Repo from '../../database/repositories';

const handlerToken = new HandlerToken();

export const loginInjector = () => {
  const loginRepo = new Repo.Login();
  const loginService = new Service.Login(loginRepo, handlerToken);
  return new Controller.Login(loginService);
};

export const clubsInjector = () => {
  const clubsRepo = new Repo.Clubs();
  const clubsService = new Service.Clubs(clubsRepo);
  return new Controller.Clubs(clubsService);
};

export const matchsInjector = () => {
  const matchsRepo = new Repo.Matchs();
  const matchsService = new Service.Matchs(matchsRepo);
  return new Controller.Matchs(matchsService);
};
