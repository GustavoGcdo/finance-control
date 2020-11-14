import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';
import { AddOperationDto } from '../../../src/modules/finance/dtos/add-operation.dto';
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

  it('POST - must return the correct balance amount when adding an operation of type expense performed', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;

    const expenseToAdd = {
      type: 'expense',
      value: VALUE_TO_ADD,
      executed: true
    } as AddOperationDto;

    const resultAddExpense = await request(expressAplication)
      .post('/finance/operations')
      .send(expenseToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddExpense.status).toEqual(HttpStatus.SUCCESS);
    expect(resultAddExpense.body.message).toEqual('operation added successfully');
    expect(resultAddExpense.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    const EXPECTED_VALUE_BALANCE = 0 - VALUE_TO_ADD;
    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(EXPECTED_VALUE_BALANCE);
  });

  it('POST - must return the correct balance amount when adding an operation of type expense not performed', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const VALUE_TO_ADD = 50.0;
    const expenseToAdd = {
      type: 'expense',
      value: VALUE_TO_ADD,
      executed: false
    } as AddOperationDto;

    const resultAddExpense = await request(expressAplication)
      .post('/finance/operations')
      .send(expenseToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultAddExpense.status).toEqual(HttpStatus.SUCCESS);
    expect(resultAddExpense.body.message).toEqual('operation added successfully');
    expect(resultAddExpense.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    const EXPECTED_VALUE_BALANCE = 0;
    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(EXPECTED_VALUE_BALANCE);
  });
});
