import { Application } from 'express';
import { App } from '../../../src/app';
import { createAndLoginUser } from '../../helpers/user-functions-default';
import request from 'supertest';
import { HttpStatus } from '../../../src/infra/enums/http-status.enum';

describe('Add Recipe a User', () => {
    let expressAplication: Application;
    let app: App;

    beforeAll(async () => {
        app = new App();
        expressAplication = await app.create();
    });

    afterAll(async () => {
        await app.disconnect();
    });

    it('GET - must return success when fetching a users operations', async () => {
        const { tokenToTest } = await createAndLoginUser();

        const result = await request(expressAplication)
            .get(`/finance/operations`)            
            .set('Authorization', 'Bearer ' + tokenToTest);

        expect(result.status).toBe(HttpStatus.SUCCESS);
        expect(result.body.data).toBeDefined();
        expect(Array.isArray(result.body.data.results)).toBeTruthy();
    });

});