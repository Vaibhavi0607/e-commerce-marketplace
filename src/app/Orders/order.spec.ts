/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect, should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
const request = require('supertest');
const chaiHTTP = require('chai-http');

import { server } from '../../index';

should();
chai.use(chaiHTTP);

describe('Order', () => {
  let addOrderPayload: any;
  let userId: any;

  beforeEach(() => {
    addOrderPayload = {
      buyerId: '637e86b72e34adab5b0c7ccc',
      orderedProducts: '6380fe2c452cba6e146dd43d',
    };
  });

  after(async () => {
    await request(server).delete(`/remove/${userId}`);
  });

  describe('Add Order', () => {
    it('Do not add with invalid fields', async () => {
      addOrderPayload.buyerId = '637e86b72e34adab5b0c7cfd';
      const res = await request(server).post('/order/api/buyer/create-order/6380fda631d66c76ca87fd0b').send(addOrderPayload);
      expect(res.status).to.equal(400);
    });

    it('Add Order', async () => {
      const res = await request(server).post('/order/api/buyer/create-order/6380fda631d66c76ca87fd0b').send(addOrderPayload);
      expect(res.status).to.equal(200);
    });
  });
});
