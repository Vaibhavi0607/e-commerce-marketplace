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
  let catalogId: any;

  beforeEach(() => {
    addCatalogPayload = {
      userId: '6380fda631d66c76ca87fd0b',
      userType: 'SELLER',
    };
  });

  after(async () => {
    console.log(catalogId);
    await request(server).delete(`/catalog/api/remove/seller-catalog/${catalogId}`);
  });

  describe('Create catalog', () => {
    it('Do not add with invalid fields', async () => {
      addCatalogPayload.userType = 'BUYER';
      const res = await request(server).post('/catalog/api/seller/create-catalog/6380fda631d66c76ca87fd0b').send(addCatalogPayload);
      expect(res.status).to.equal(400);
    });

    it('Create catalog', async () => {
      const res = await request(server).post('/catalog/api/seller/create-catalog/6381fd32a79787693a2c50e0').send(addCatalogPayload);
      catalogId = res.body.message._id;
      console.log(res.body)
      expect(res.status).to.equal(200); // Catalog already exists for user
    });
  });
});
