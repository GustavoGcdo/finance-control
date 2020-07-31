import request from 'supertest';
import { App } from '../../../src/app';
import { Application } from 'express';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';

describe('Signup Controller', () => {
    let expressAplication: Application;
    let app: App;

    beforeAll(async () => {
        app = new App();
        expressAplication = await app.create();
    });

    afterAll(async () => {
        await app.disconnect();
    });

    it('POST - must return success when trying to register a user', async () => {

        const newUser = {
            name: 'Gustavo',
            email: 'gustavo.gcdo@gmail.com',
            password: 'senha123',
            confirmPassword: 'senha123'
        };

        const result = await request(expressAplication).post('/signup').send(newUser);
        expect(result.status).toEqual(HttpStatus.CREATED);
        expect(result.body.message).toEqual('user successfully registered');
        expect(result.body.success).toBeTruthy();
    });

    it('POST - must return fail when trying to register a invalid user', async () => {
    
        const newUser = {
            name: 'Gustavo',     
            password: 'senha123',            
        };

        const result = await request(expressAplication).post('/signup').send(newUser);
        expect(result.status).toEqual(HttpStatus.BAD_REQUEST);
        expect(result.body.message).toEqual('fail to register user');
        expect(result.body.success).toBeFalsy();
    });
});
