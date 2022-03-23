import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import chaiHttp = require('chai-http');

import Users from '../database/models/users';
import * as Mock from './mock/';
import { ILoginResponse } from '../interfaces';
import { StatusCode as code, msgs } from '../environments/';
import { UsersLogin, getChaiHttpResponse } from './utils/';

const loginResponseSuccess: ILoginResponse = {
  user: {
    id:Mock.Users[0].id,
    username: Mock.Users[0].username,
    role: Mock.Users[0].role,
    email: Mock.Users[0].email,
  },
  token: Mock.token,
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
        .resolves({ ...Mock.Users[0] } as Users);

      sinon
        .stub(jwt, 'sign')
        .resolves(Mock.token);

      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/login',
        UsersLogin.validAdmin
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
        'POST',
        '/login',
        UsersLogin.incorrectAdminEmail
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_INCORRECT);
    });

    it('se não receber "email" retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/login',
        UsersLogin.noAdminEmail
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_FIELDS_UNDEFINED);
    });

    it('se receber "email" com formato invalido retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/login',
        UsersLogin.invalidAdminEmail
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_INCORRECT);
    });

    it('ao receber "password" incorreto retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/login',
        UsersLogin.incorrectAdminPass
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_INCORRECT);
    });

    it('se não receber "password" retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/login',
        UsersLogin.noAdminPass
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_FIELDS_UNDEFINED);
    });

    it('se receber "password" com menos de 6 caracteres retornará status não-autorizado', async () => {      
      chaiHttpResponse = await getChaiHttpResponse(
        'POST',
        '/login',
        UsersLogin.invalidAdminPass
      );

      expect(chaiHttpResponse).to.have.status(code.UNAUTHORIZED);
      expect(chaiHttpResponse.body).to.be.deep.equal(msgs.LOGIN_PASS_MIN);
    });
    
  })

})

describe('Testa endpoint GET /login/validate', () => {
  let chaiHttpResponse: Response;

  describe('Ao passar token valido no header "Authorization"', () => {
    before(async () => { 
      sinon
        .stub(Users, 'findOne')
        .resolves({ ...Mock.Users[0] } as Users);

      sinon
        .stub(jwt, 'verify')
        .resolves(Mock.Users[0]);

      chaiHttpResponse = await getChaiHttpResponse(
        'GET',
        '/login/validate',
        '',
        Mock.token,
      );
    });

    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    });

    it('retorna status code 200', () => {
      expect(chaiHttpResponse).to.have.status(code.OK);
    });

    it('retorna uma string contendo o "role" do user', () => {
      expect(chaiHttpResponse.body).to.be.equal(Mock.Users[0].role)
    });

  });

})
