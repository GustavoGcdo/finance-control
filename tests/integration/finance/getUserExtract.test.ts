import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';
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

  it('GET - must return success when fetching a user statement', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const result = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    const { status, body } = result;
    expect(status).toBe(HttpStatus.SUCCESS);
    expect(body.data).toBeDefined();
    expect(body.data).toHaveProperty('name');
    expect(body.data).toHaveProperty('email');
    expect(body.data).toHaveProperty('balance');
    expect(body.data).toHaveProperty('totalRecipes');
    expect(body.data).toHaveProperty('totalExpenses');
  });
});
