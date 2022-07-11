import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { AddOperationDto } from '../../../src/modules/operations/dtos/add-operation.dto';
import { HttpStatus } from '../../../src/presentation/helper/enums/http-status.enum';
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
    const { tokenToTest } = await createAndLoginUser();

    const recipeToAdd = {
      type: 'invalidType',
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

  it('PUT - must return success when trying to perform an existing operation', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;

    const recipeToAdd = {
      type: 'recipe',
      value: VALUE_TO_ADD,
      executed: false
    } as AddOperationDto;

    const resultAddOperation = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddOperation.body.success).toBeTruthy();

    const createdOperationId = resultAddOperation.body.data.id;

    const updateRecipe = {
      ...recipeToAdd,
      executed: true
    };

    const result = await request(expressAplication)
      .put(`/finance/operations/${createdOperationId}`)
      .send(updateRecipe)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.message).toEqual('operation updated successfully');
    expect(result.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(VALUE_TO_ADD);
  });

  it('PUT - must return success when trying to update value an existing operation', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;

    const recipeToAdd = {
      type: 'recipe',
      value: VALUE_TO_ADD,
      executed: true
    } as AddOperationDto;

    const resultAddOperation = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddOperation.body.success).toBeTruthy();

    const createdOperationId = resultAddOperation.body.data.id;

    const VALUE_TO_UPDATE = 100;
    const updateRecipe = {
      ...recipeToAdd,
      value: VALUE_TO_UPDATE
    };

    const result = await request(expressAplication)
      .put(`/finance/operations/${createdOperationId}`)
      .send(updateRecipe)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.message).toEqual('operation updated successfully');
    expect(result.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(VALUE_TO_UPDATE);
  });

  it.only('PUT - must return success when trying to unperform an existing operation', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;

    const recipeToAdd = {
      type: 'recipe',
      value: VALUE_TO_ADD,
      executed: true
    } as AddOperationDto;

    const resultAddOperation = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddOperation.body.success).toBeTruthy();

    const createdOperationId = resultAddOperation.body.data.id;
    const updateRecipe = {
      ...recipeToAdd,
      executed: false
    };

    const result = await request(expressAplication)
      .put(`/finance/operations/${createdOperationId}`)
      .send(updateRecipe)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.message).toEqual('operation updated successfully');
    expect(result.body.success).toBeTruthy();

    const EXPECTED_BALANCE = 0;
    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(EXPECTED_BALANCE);
  });

  it('PUT - must return success when trying change type an existing operation', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;

    const recipeToAdd = {
      type: 'recipe',
      value: VALUE_TO_ADD,
      executed: true
    } as AddOperationDto;

    const resultAddOperation = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddOperation.body.success).toBeTruthy();

    const createdOperationId = resultAddOperation.body.data.id;
    const updateRecipe = {
      ...recipeToAdd,
      type: 'expense'
    };

    const result = await request(expressAplication)
      .put(`/finance/operations/${createdOperationId}`)
      .send(updateRecipe)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.message).toEqual('operation updated successfully');
    expect(result.body.success).toBeTruthy();

    const EXPECTED_BALANCE = 0 - VALUE_TO_ADD;
    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(EXPECTED_BALANCE);
  });
});
