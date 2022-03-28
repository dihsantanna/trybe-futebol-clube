import { Router } from 'express';
import * as injectors from '../helpers/injectors';

const leaderBoardController = injectors.leaderBoard();

const route = Router();

route.get(
  '/home',
  leaderBoardController.homeTeamsRank,
);

route.get(
  '/away',
  leaderBoardController.awayTeamsRank,
);

route.get(
  '/',
  leaderBoardController.leaderBoard,
);

export default route;
