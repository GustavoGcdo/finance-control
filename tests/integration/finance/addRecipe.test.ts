import request from 'supertest';
import { App } from '../../../src/app';
import { Application } from 'express';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';
import DIContainer from '../../../src/di-container';
import { ISignupHandler } from '../../../src/modules/login/handlers/signup-handler.interface';
import LoginTypes from '../../../src/modules/login/types/login.types';
import { User } from '../../../src/modules/users/models/user';
import { AddRecipeDto } from '../../../src/modules/finance/dtos/add-recipe.dto';
import { Types } from 'mongoose';

describe('Add Recipe a User', () => {
    let expressAplication: Application;
    let app: App;
    let userToTest: User;

    const validUser = {
        name: 'Gustavo',
        email: 'gustavo.gcdo@gmail.com',
        password: 'senha123',
        confirmPassword: 'senha123'
    };

    async function createValidUser() {
        const signupHandler = DIContainer.get<ISignupHandler>(LoginTypes.SignupHandler);
        const result = await signupHandler.handle(validUser);
        userToTest = result.data;
    }

    beforeAll(async () => {
        app = new App();
        expressAplication = await app.create();
    });

    afterAll(async () => {
        await app.disconnect();
    });

    it('POST - must return success when trying to add recipe to a valid user', async () => {
        await createValidUser();

        const recipeToAdd: AddRecipeDto = {
            userId: userToTest._id,
            value: 50.0
        }

        const result = await request(expressAplication).post(`/finance/recipes`).send(recipeToAdd);
        expect(result.status).toEqual(HttpStatus.SUCCESS);
        expect(result.body.message).toEqual('recipe added successfully');
        expect(result.body.success).toBeTruthy();
    });

    it('POST - must return fail when trying to add recipe a invalid user', async () => {
        await createValidUser();

        const recipeToAdd: AddRecipeDto = {
            userId: 'userIdInvalid',
            value: 50.0
        }

        const result = await request(expressAplication).post('/finance/recipes').send(recipeToAdd);
        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to add recipe');
        expect(result.body.success).toBeFalsy();
    });


    it('POST - must return fail when trying to add recipe a invalid value', async () => {
        await createValidUser();

        const recipeToAdd: AddRecipeDto = {
            userId: userToTest._id,
            value: -50.0
        }

        const result = await request(expressAplication).post('/finance/recipes').send(recipeToAdd);
        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to add recipe');
        expect(result.body.success).toBeFalsy();
    });


    it('POST - must return failure when trying to add a recipe to a non-existent user ', async () => {
        const idValidUserNonExistent = new Types.ObjectId().toHexString();

        const recipeToAdd: AddRecipeDto = {
            userId: idValidUserNonExistent,
            value: 50.0
        }

        const result = await request(expressAplication).post('/finance/recipes').send(recipeToAdd);
        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to add recipe');
        expect(result.body.success).toBeFalsy();
        expect(result.body.errors).toContainEqual({ name: 'user', message: 'non-existent user' });
    });
});
