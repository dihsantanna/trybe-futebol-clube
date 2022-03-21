import * as chai from 'chai';
import { app } from '../../app';


export default async (route: string, body: string | object) => {
  return await chai
  .request(app)
  .post(route)
  .send(body);
};
