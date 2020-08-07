import request from 'supertest';
import { App } from '../../../src/app';
import { Application } from 'express';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';
import DIContainer from '../../../src/di-container';
import { ISignupHandler } from '../../../src/modules/login/handlers/signup-handler.interface';
import LoginTypes from '../../../src/modules/login/types/login.types';
import { User } from '../../../src/modules/users/models/user';
import { SignupDto } from '../../../src/modules/login/dtos/signup.dto';

describe('Login Controller', () => {
    let expressAplication: Application;
    let app: App;
    let userToTest: User;

    const validUser: SignupDto = {
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
            password: 'otherPassword',
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
