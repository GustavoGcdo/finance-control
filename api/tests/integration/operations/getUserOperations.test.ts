import { Application } from 'express';
import qs from 'qs';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/infra/helper/enums/http-status.enum';
import { createAndLoginUser } from '../../helpers/user-functions-default';

describe('Get user Operations', () => {
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
    expect(result.body.data).toHaveProperty('total');
  });

  it('GET - must return fail when pass a invalid page', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const queryString = qs.stringify({ page: 'invalid' });
    const result = await request(expressAplication)
      .get(`/finance/operations?${queryString}`)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toContainEqual({
      name: 'page',
      message: 'page must be a valid number'
    });
  });

  it('GET - must return fail when pass a invalid limit', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const queryString = qs.stringify({ limit: 'invalid' });
    const result = await request(expressAplication)
      .get(`/finance/operations?${queryString}`)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toBe(HttpStatus.BAD_REQUEST);
    expect(result.body.success).toBeFalsy();
    expect(result.body.data).toBeNull();
    expect(result.body.errors).toContainEqual({
      name: 'limit',
      message: 'limit must be a valid number'
    });
  });
});
