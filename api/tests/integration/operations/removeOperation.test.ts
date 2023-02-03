import { Application } from 'express';
import request from 'supertest';
import { App } from '../../../src/app';
import { AddOperationDto } from '../../../src/application/useCases/addOperation/add-operation.dto';
import { HttpStatus } from '../../../src/infra/helper/enums/http-status.enum';
import { createAndLoginUser } from '../../helpers/user-functions-default';

describe('Remove Operation a User', () => {
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

  it('PUT - must return success when trying remove an existing operation', async () => {
    const { tokenToTest } = await createAndLoginUser();

    const recipeToAdd = {
      type: 'recipe',
      value: 50.0,
      executed: true
    } as AddOperationDto;

    const resultAddOperation = await request(expressAplication)
      .post('/finance/operations')
      .send(recipeToAdd)
      .set('Authorization', 'Bearer ' + tokenToTest);

      console.log(resultAddOperation.body);
      

    expect(resultAddOperation.body.success).toBeTruthy();

    const createdOperationId = resultAddOperation.body.data.id;

    const result = await request(expressAplication)
      .delete(`/finance/operations/${createdOperationId}`)
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(result.status).toEqual(HttpStatus.SUCCESS);
    expect(result.body.message).toEqual('operation removed successfully');
    expect(result.body.success).toBeTruthy();

    const resultExtract = await request(expressAplication)
      .get('/finance/extract')
      .set('Authorization', 'Bearer ' + tokenToTest);

    expect(resultExtract.status).toEqual(HttpStatus.SUCCESS);
    expect(resultExtract.body.data.balance).toBe(0);
  });
});
