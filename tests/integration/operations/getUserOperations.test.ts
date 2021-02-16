import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/presentation/helper/enums/http-status.enum';
import { createAndLoginUser } from '../../helpers/user-functions-default';

describe('Add Recipe a User', () => {
  let expressAplication: Application;
  let app: App;

  beforeAll(async () => {
    app = new App();
    expressAplication = await app.create();
  });

  beforeEach(async () => {
    await app.getConnection().dropDatabase();
  });

  afterAll(async () => {
    await app.disconnect();
  });

  it('GET - must return success when fetching a users operations', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const result = await request(expressAplication)
      .get('/finance/operations')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toBe(HttpStatus.SUCCESS);
    expect(result.body.data).toBeDefined();
    expect(Array.isArray(result.body.data.results)).toBeTruthy();
  });
});
