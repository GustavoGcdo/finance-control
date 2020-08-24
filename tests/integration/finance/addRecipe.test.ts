import { Application } from 'express';
import { Types } from 'mongoose';
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

    it('POST - must return success when trying to add recipe to a valid user', async () => {
        const { userToTest, tokenToTest } = await createAndLoginUser();

        const recipeToAdd = {
            type: 'recipe',
            userId: userToTest._id,
            value: 50.0
        } as AddOperationDto;

        const result = await request(expressAplication)
            .post(`/finance/operations`)
            .send(recipeToAdd)
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toEqual(HttpStatus.SUCCESS);
        expect(result.body.message).toEqual('operation added successfully');
        expect(result.body.success).toBeTruthy();
    });
   
});
