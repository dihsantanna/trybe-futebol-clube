import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app } from '../../app';

interface GetChaiParams { method: string, route: string, body: string | object, token: string };

chai.use(chaiHttp);

const deleteResponse = async ({ method, route, body, token}: GetChaiParams) => {
  return await chai
        .request(app)
        .delete(route)
        .set('authorization', token)
        .send(body);
};

const patchResponse = async ({ method, route, body, token}: GetChaiParams) => {
  if (method !== 'PATCH') return await deleteResponse({ method, route, body, token});
  return await chai
        .request(app)
        .patch(route)
        .set('authorization', token)
        .send(body);
};

const putResponse = async ({ method, route, body, token}: GetChaiParams) => {
  if (method !== 'PUT') return await patchResponse({ method, route, body, token});
  return await chai
        .request(app)
        .put(route)
        .set('authorization', token)
        .send(body);
};

const getResponse = async ({ method, route, body, token}: GetChaiParams) => {
  if (method !== 'GET') return await putResponse({ method, route, body, token});
  return await chai
        .request(app)
        .get(route)
        .set('authorization', token)
        .send(body);
};

const postResponse = async ({ method, route, body, token}: GetChaiParams) => {
  if (method !== 'POST') return await getResponse({ method, route, body, token});
  return await chai
        .request(app)
        .post(route)
        .set('authorization', token)
        .send(body);
};

export default async (method: string, route: string, body: string | object, token: string = '') => {
  return await postResponse({ method, route, body, token});
};
