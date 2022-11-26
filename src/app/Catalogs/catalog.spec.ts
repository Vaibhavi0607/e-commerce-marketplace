/* eslint-disable @typescript-eslint/no-var-requires */
import chai, { expect, should } from 'chai';
import { describe, it, beforeEach } from 'mocha';
const request = require('supertest');
const chaiHTTP = require('chai-http');

import { server } from '../../index';

should();
chai.use(chaiHTTP);

describe('Catalog', () => {
  let addCatalogPayload: any;
  let userId: any;

  beforeEach(() => {
    addCatalogPayload = {
      userId: '6380fda631d66c76ca87fd0b',
      userType: 'SELLER',
    };
  });

  after(async () => {
    await request(server).delete(`/remove/${userId}`);
  });

  describe('Create catalog', () => {
    it('Do not add with invalid fields', async () => {
      addCatalogPayload.userType = 'BUYER';
      const res = await request(server).post('/catalog/api/seller/create-catalog/6380fda631d66c76ca87fd0b').send(addCatalogPayload);
      expect(res.status).to.equal(400);
    });

    it('Create catalog', async () => {
      const res = await request(server).post('/catalog/api/seller/create-catalog/6380fda631d66c76ca87fd0b').send(addCatalogPayload);
      userId = res.body._id;
      expect(res.status).to.equal(500); // Catalog already exists for user
    });
  });
});
