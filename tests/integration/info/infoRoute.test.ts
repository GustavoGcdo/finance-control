import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/presentation/helper/enums/http-status.enum';

describe('Info Controller', () => {
  let expressAplication: Application;
  let app:App;

  beforeAll(async () => {
    app = new App();
    expressAplication = await app.create();
  });

  afterAll(async () => {
    await app.disconnect();
  });

  it('GET - shold be return info api', async () => {
    const expectedResult = {
      name: 'finance-control-api',
      version: '1.0.0'
    };

    const result = await request(expressAplication).get('/');
    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.data).toEqual(expectedResult);
  });
});
