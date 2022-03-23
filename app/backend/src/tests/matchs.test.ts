import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Matchs from '../database/models/matchs';
import * as Mock from './mock';
import { StatusCode as code, msgs } from '../environments';
import { getChaiHttpResponse } from './utils';

const matchsResponseSuccess = Mock.MatchsMock;

const matchsInProgressResponse = Mock.MatchsMock.filter((m) => m.inProgress);

const matchsFinishedResponse = Mock.MatchsMock.filter((m) => !m.inProgress);

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testa o endpoint GET /matchs', () => {
  before(async () => {
    sinon
      .stub(Matchs, 'findAll')
      .resolves(Mock.MatchsMock as unknown as Matchs[])

    chaiHttpResponse = await getChaiHttpResponse(
      'GET',
      '/matchs',
      '',
    );
  });

  after(() => {
    (Matchs.findAll as sinon.SinonStub).restore();
  });

  it('verifica se retorna status code 200', () => {
    expect(chaiHttpResponse).to.have.status(code.OK);
  });

  it('verifica se retorna array com todas as partidas', () => {
    expect(chaiHttpResponse.body).to.be.deep.equal(matchsResponseSuccess)
  })

})