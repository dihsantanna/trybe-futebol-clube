import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Matchs from '../database/models/matchs';
import Clubs from '../database/models/clubs';
import { getChaiHttpResponse } from './helpers';
import * as Mock from './mock';
import { StatusCode as code } from '../environments';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect }  = chai;

const homeLeaderBoard = Mock.HomeLeaderBoard;
const awayLeaderBoard = Mock.AwayLeaderBoard;
const leaderBoard = Mock.LeaderBoard;

let chaiHttpResponse: Response;

describe('Testa endpoint GET /leaderboard/home', () => {
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(Mock.AllMatchs as unknown as Matchs[]);
    
    sinon
      .stub(Clubs, 'findAll')
      .resolves(Mock.ClubsMock as Clubs[]);

    chaiHttpResponse = await getChaiHttpResponse(
      'GET',
      '/leaderboard/home',
      '',
    );
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
    (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('retorna status code 200', () => {
    expect(chaiHttpResponse).to.have.status(code.OK);
  });

  it(`retorna lista com as informações de classificação dos times como mandantes
   das partidas concluídas`, () => {
     expect(chaiHttpResponse.body).to.be.deep.equal(homeLeaderBoard);
   });

});

describe('Testa endpoint GET /leaderboard/away', () => {
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(Mock.AllMatchs as unknown as Matchs[]);
    
    sinon
      .stub(Clubs, 'findAll')
      .resolves(Mock.ClubsMock as Clubs[]);

    chaiHttpResponse = await getChaiHttpResponse(
      'GET',
      '/leaderboard/away',
      '',
    );
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
    (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('retorna status code 200', () => {
    expect(chaiHttpResponse).to.have.status(code.OK);
  });

  it(`retorna lista com as informações de classificação dos times como visitantes
   das partidas concluídas`, () => {
     expect(chaiHttpResponse.body).to.be.deep.equal(awayLeaderBoard);
   });

});

describe('Testa endpoint GET /leaderboard', () => {
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(Mock.AllMatchs as unknown as Matchs[]);
    
    sinon
      .stub(Clubs, 'findAll')
      .resolves(Mock.ClubsMock as Clubs[]);

    chaiHttpResponse = await getChaiHttpResponse(
      'GET',
      '/leaderboard',
      '',
    );
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
    (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('retorna status code 200', () => {
    expect(chaiHttpResponse).to.have.status(code.OK);
  });

  it(`retorna lista com as informações de classificação geral das partidas concluídas`, () => {
     expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoard);
   })
})


