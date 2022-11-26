/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect, should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
const request = require('supertest');
const chaiHTTP = require('chai-http');

import { server } from '../../index';

should();
chai.use(chaiHTTP);

describe('Product', () => {
  let addProductPayload: any;
  let userId: any;

  beforeEach(() => {
    addProductPayload = {
      productName: 'testProduct',
      productDescription: 'test, test',
      productPrice: 1000,
      owner: '6380fda631d66c76ca87fd0b',
      catalogId: '6380fdbd31d66c76ca87fd0e',
    };
  });

  after(async () => {
    await request(server).delete(`/remove/${userId}`);
  });

  describe('Add product', () => {
    it('Do not add with invalid fields', async () => {
      addProductPayload.productPrice = 0;
      const res = await request(server).post('/product/api/add-product').send(addProductPayload);
      expect(res.status).to.equal(400);
    });

    it('Add product', async () => {
      const res = await request(server).post('/product/api/add-product').send(addProductPayload);
      userId = res.body._id;
      expect(res.status).to.equal(200);
    });
  });
});
