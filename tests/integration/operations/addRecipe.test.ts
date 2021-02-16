import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { AddOperationDto } from '../../../src/modules/operations/dtos/add-operation.dto';
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

  it('POST - must return the correct balance amount when adding an operation of type recipe performed', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;

    const recipeToAdd = {
      type: 'recipe',
      value: VALUE_TO_ADD,
      executed: true
    } as AddOperationDto;

    const resultAddRecipe = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddRecipe.status).toEqual(HttpStatus.SUCCESS);
    expect(resultAddRecipe.body.message).toEqual('operation added successfully');
    expect(resultAddRecipe.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(VALUE_TO_ADD);
  });

  it('POST - must return the correct balance amount when adding an operation of type recipe not performed', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;
    const recipeToAdd = {
      type: 'recipe',
      value: VALUE_TO_ADD,
      executed: false
    } as AddOperationDto;

    const resultAddRecipe = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddRecipe.status).toEqual(HttpStatus.SUCCESS);
    expect(resultAddRecipe.body.message).toEqual('operation added successfully');
    expect(resultAddRecipe.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    const EXPECTED_VALUE_BALANCE = 0;
    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(EXPECTED_VALUE_BALANCE);
  });
});
