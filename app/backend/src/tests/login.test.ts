import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/users';
import usersMock from './mock/UsersMock';
import tokenMock from './mock/tokenMock';
import { ILoginResponse } from '../interfaces';
import code from '../environments/statusCode';
import usersLogin from './utils/usersLogin';
import getChaiHttpResponse from './utils/getChaiHttpResponse';
import msgs from '../environments/msgsError'

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
  let chaiHttpResponse: Response;
  
  describe('Ao passar "email" e "password" válidos é encontrado com sucesso usuário do DB',
  () => {
    before(async () => { 
      sinon
        .stub(Users, 'findOne')
        .resolves({ ...usersMock[0] } as Users);

      sinon
        .stub(jwt, 'sign')
        .resolves(tokenMock);

      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.validAdmin
      );
    });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    })

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

  describe('Ao passar "email" ou "password" inválidos não é possível efetuar o login', () => {

    before(async () => {
      sinon
        .stub(Users, 'findOne')
        .resolves(null);
    })

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
      
    it('ao receber "email" incorreto retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.incorrectAdminEmail
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_INCORRECT);
    });

    it('se não receber "email" retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.noAdminEmail
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_FIELDS_UNDEFINED);
    });

    it('se receber "email" com formato invalido retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.invalidAdminEmail
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_INCORRECT);
    });

    it('ao receber "password" incorreto retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.incorrectAdminPass
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_INCORRECT);
    });

    it('se não receber "password" retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.noAdminPass
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_FIELDS_UNDEFINED);
    });

    it('se receber "password" com menos de 6 caracteres retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        '/login',
        usersLogin.invalidAdminPass
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_PASS_MIN);
    });
    
  })

})
