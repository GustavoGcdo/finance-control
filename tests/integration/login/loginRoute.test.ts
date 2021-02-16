import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/presentation/helper/enums/http-status.enum';
import { createValidUser, validUser } from '../../helpers/user-functions-default';

describe('Login Controller', () => {
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

  it('POST - must return success when trying to login with valid user credentials', async () => {
    await createValidUser();
    const { email, password } = validUser;

    const result = await request(expressAplication).post('/login').send({ email, password });
    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.message).toEqual('user successfully logged');
    expect(result.body.success).toBeTruthy();
    expect(result.body.data).toHaveProperty('token');
    expect(typeof result.body.data.token).toBe('string');
  });

  it('POST - must return fail when trying to login with user not registered', async () => {
    const invalidUserCredentials = {
      email: 'invalid@email.com',
      password: 'otherPassword'
    };

    const result = await request(expressAplication).post('/login').send(invalidUserCredentials);
    expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(result.body.message).toEqual('fail to user login');
    expect(result.body.success).toBeFalsy();
    expect(result.body.errors).toContainEqual({ name: 'login', message: 'invalid email or password' });
  });

  it('POST - must return fail when trying to login with invalid credentials data', async () => {
    const invalidUserCredentials = {
      email: 'invalid_email'
    };

    const result = await request(expressAplication).post('/login').send(invalidUserCredentials);
    expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(result.body.message).toEqual('fail to user login');
    expect(result.body.success).toBeFalsy();
    expect(result.body.errors).toContainEqual({ name: 'email', message: 'invalid email' });
    expect(result.body.errors).toContainEqual({ name: 'password', message: 'password is required' });
  });
});
