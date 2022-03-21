import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';
import usersMock from './mock/UsersMock';
import tokenMock from './mock/tokenMock';
import { ILoginResponse } from '../interfaces';
import code from '../environments/statusCode';
import usersLogin from './utils/usersLogin';

const loginResponseSuccess: ILoginResponse = {
  user: {
    id:usersMock[0].id,
    username: usersMock[0].username,
    role: usersMock[0].role,
    email: usersMock[0].email,
  },
  token: tokenMock,
}

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa endpoint POST /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves({ ...usersMock[0] } as Users);

    sinon
    .stub(jwt, 'sign')
    .resolves(tokenMock);

    sinon
    .stub(bcrypt, 'compare')
    .resolves(true)
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
    (bcrypt.compare as sinon.SinonStub).restore();
  })
  
  describe('Ao passar "email" e "password" válidos é encontrado com sucesso usuário do DB',
  () => {
    before(async () => {  
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(usersLogin.validAdmin);
    });

    it('retorna status code "200"', () => {
      expect(chaiHttpResponse).to.have.status(code.OK);
    });

    it('retorna no body um objeto com as chaves "user"(`id`, `username`, `role`, `email`) e "token"', () => {
      expect(chaiHttpResponse.body).to.have.all.keys('user', 'token');
      expect(chaiHttpResponse.body.user).to.have.all.keys('id', 'username', 'role', 'email');
    });

    it('retorna no body os valores esperados', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(loginResponseSuccess)
    })

  })

  // describe('Ao passar "email" ou "password" inválidos não é possível efetuar o login', () => {
  //   it('', async () => {})
  // })

})
