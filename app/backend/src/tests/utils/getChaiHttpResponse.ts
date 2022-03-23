import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../../app';
import { MethodsChai } from '../../types';

chai.use(chaiHttp);

export default async (method: MethodsChai, route: string, body: string | object, token: string = '') => {
  switch (method ? method.toLocaleUpperCase() : '') {
    case 'POST':
      return await chai
        .request(app)
        .post(route)
        .auth('Authorization', token)
        .send(body);

    case 'GET':
      return await chai
        .request(app)
        .get(route)
        .auth('Authorization', token)
        .send(body);

    case 'PUT':
      return await chai
        .request(app)
        .put(route)
        .auth('Authorization', token)
        .send(body);

    default:
      return await chai
        .request(app)
        .delete(route)
        .auth('Authorization', token)
        .send(body);
  }
};
