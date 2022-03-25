import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import Clubs from '../database/models/clubs';
import * as Mock from './mock/';
import { StatusCode as code, msgs } from '../environments/';
import { getChaiHttpResponse } from './helpers';

const clubsResponseSuccess = Mock.ClubsMock;

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testa endpoint GET /clubs', () => {
  before(async () => {
    sinon
      .stub(Clubs, 'findAll')
      .resolves(Mock.ClubsMock as Clubs[]);

    chaiHttpResponse = await getChaiHttpResponse(
      'GET',
      '/clubs',
      '',
    )
  })

  after(() => {
    (Clubs.findAll as sinon.SinonStub).restore();
  });

  it('verifica se retorna status code 200', () => {
    expect(chaiHttpResponse).to.have.status(code.OK);
  });

  it('verifica se retorna um array com todos os clubs', () => {
    expect(chaiHttpResponse.body).to.be.deep.equal(clubsResponseSuccess);
  });

});

describe('Testa endpoint GET /clubs/:id', () => {
  describe('passado um id existente como parâmetro', () => {
    before(async () => {
      sinon
        .stub(Clubs, 'findByPk')
        .resolves(Mock.ClubsMock[0] as Clubs);
  
      chaiHttpResponse = await getChaiHttpResponse(
        'GET',
        '/clubs/1',
        '',
      )
    })
  
    after(() => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    });
  
    it('verifica se retorna status code 200', () => {
      expect(chaiHttpResponse).to.have.status(code.OK);
    });
  
    it('verifica se retorna o club cujo o id é o mesmo passado', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(clubsResponseSuccess[0]);
    });

  });

  describe('passado um id inexistente como parâmetro', () => {
    before(async () => {
      sinon
        .stub(Clubs, 'findByPk')
        .resolves(null);
  
      chaiHttpResponse = await getChaiHttpResponse(
        'GET',
        '/clubs/999',
        '',
      )
    })
  
    after(() => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    });
  
    it('verifica se retorna status code 400', () => {
      expect(chaiHttpResponse).to.have.status(code.BAD_REQUEST);
    });
  
    it('verifica se retorna o mensagem de erro', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.TEAM_NOT_FOUND);
    })
  })

})