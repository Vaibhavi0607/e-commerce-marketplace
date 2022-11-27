/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect, should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
const request = require('supertest');
const chaiHTTP = require('chai-http');

import { server } from '../../index';

should();
chai.use(chaiHTTP);

describe('User', () => {
  let addUserPayload: any;
  let userId: any;

  beforeEach(() => {
    addUserPayload = {
      username: 'test',
      password: 'test, test',
      userType: 'SELLER',
      email: 'test@gmail.com',
      address: 'bdsj',
    };
  });

  after(async () => {
    await request(server).delete(`/users/api/remove/${userId}`);
  });

  describe('Add user', () => {
    it('Do not add with invalid fields', async () => {
      addUserPayload.password = 12345;
      const res = await request(server).post('/users/api/auth/register').send(addUserPayload);
      expect(res.status).to.equal(400);
    });

    it('Add user', async () => {
      const res = await request(server).post('/users/api/auth/register').send(addUserPayload);
      userId = res.body.message._id;
      expect(res.status).to.equal(201);
    });
  });
});
