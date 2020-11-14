import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';
import { AddOperationDto } from '../../../src/modules/finance/dtos/add-operation.dto';
import { createAndLoginUser } from '../../helpers/user-functions-default';

describe('Add Operation a User', () => {
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

  it('POST - must return fail when trying to add operation a invalid value', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const recipeToAdd = {
      type: 'expense',
      value: -50.0
    } as AddOperationDto;

    const result = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(result.body.message).toEqual('fail to add operation');
    expect(result.body.success).toBeFalsy();
  });

  it('POST - must return fail when trying to add operation a invalid type', async () => {
    const { userToTest, tokenToTest } = await createAndLoginUser();

    const recipeToAdd = {
      type: 'invalidType',
      userId: userToTest._id,
      value: 50.0
    } as AddOperationDto;

    const result = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
    expect(result.body.message).toEqual('fail to add operation');
    expect(result.body.success).toBeFalsy();
    expect(result.body.errors).toContainEqual({ name: 'type', message: 'operation invalid' });
  });
});
