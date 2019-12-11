import supertest from 'supertest';
import express, {Express} from 'express';
import { ExpressApp } from "../../src/core/web-app/ExpressApp";
import {Response} from "../test-values/HttpResponseValues";

describe('start.ts', () => {
    let expressApp: ExpressApp;
    let app: Express;
    beforeAll(async () => {
        app = express();
        expressApp = new ExpressApp(app);
        expressApp.setup();
        await expressApp.start();
    });
    afterAll(async () => {
       await expressApp.stop();
    });
    const healthUrl = '/health';
    describe(`get ${healthUrl}`, () => {
        const expectedResponse = Response.getHealth;
        const expectedStatusCode = 200;

        it(`Status: ${expectedStatusCode}. Response body: ${expectedResponse}.`, async () => {
            // Arrange

            // Act
            const response = await supertest(app).get(healthUrl);

            // Assert
            expect(response.body).toEqual(expectedResponse.body);
            expect(response.status).toEqual(expectedResponse.statusCode);
        });
    });
});
