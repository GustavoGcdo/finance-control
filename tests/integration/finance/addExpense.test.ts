import { Application } from 'express';
import { Types } from 'mongoose';
import request from 'supertest';
import { App } from '../../../src/app';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';
import { AddExpenseDto } from '../../../src/modules/finance/dtos/add-expense.dto';
import { AddRecipeDto } from '../../../src/modules/finance/dtos/add-recipe.dto';
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

    it('POST - must return success when trying to add expense to a valid user', async () => {
        const { userToTest, tokenToTest } = await createAndLoginUser();

        const expenseToAdd: AddExpenseDto = {
            userId: userToTest._id,
            value: 50.0
        }

        const result = await request(expressAplication)
            .post(`/finance/expenses`)
            .send(expenseToAdd)
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toEqual(HttpStatus.SUCCESS);
        expect(result.body.message).toEqual('expense added successfully');
        expect(result.body.success).toBeTruthy();
    });

    it('POST - must return success when trying to add paid expense to a valid user', async () => {
        const { userToTest, tokenToTest } = await createAndLoginUser();

        const expenseToAdd: AddExpenseDto = {
            userId: userToTest._id,
            value: 50.0,
            paid: true
        }

        const result = await request(expressAplication)
            .post(`/finance/expenses`)
            .send(expenseToAdd)
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toEqual(HttpStatus.SUCCESS);
        expect(result.body.message).toEqual('expense added successfully');
        expect(result.body.success).toBeTruthy();
    });

    it('POST - must return fail when trying to add expense a invalid user', async () => {
        const { tokenToTest } = await createAndLoginUser();

        const expenseToAdd: AddExpenseDto = {
            userId: 'userIdInvalid',
            value: 50.0
        }

        const result = await request(expressAplication)
            .post('/finance/expenses')
            .send(expenseToAdd)
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to add expense');
        expect(result.body.success).toBeFalsy();
    });


    it('POST - must return fail when trying to add expense a invalid value', async () => {
        const { userToTest, tokenToTest } = await createAndLoginUser();

        const expenseToAdd: AddExpenseDto = {
            userId: userToTest._id,
            value: -50.0
        }

        const result = await request(expressAplication)
            .post('/finance/expenses')
            .send(expenseToAdd)
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to add expense');
        expect(result.body.success).toBeFalsy();
    });


    it('POST - must return failure when trying to add a expense to a non-existent user ', async () => {
        const { tokenToTest } = await createAndLoginUser();
        const idValidUserNonExistent = new Types.ObjectId().toHexString();

        const recipeToAdd: AddRecipeDto = {
            userId: idValidUserNonExistent,
            value: 50.0
        }

        const result = await request(expressAplication)
            .post('/finance/expenses')
            .send(recipeToAdd)
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to add expense');
        expect(result.body.success).toBeFalsy();
        expect(result.body.errors).toContainEqual({ name: 'user', message: 'non-existent user' });
    });
});
