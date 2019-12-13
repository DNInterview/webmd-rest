import supertest from 'supertest';
import express, {Express} from 'express';
import GetHealthResponse from "../../src/health/GetHealthResponse";
import packageJson from "../../package.json";
import App from "../../src/core/app/App";
import IWebApp from "../../src/core/web-app/IWebApp";

describe('App.ts', () => {
    let expressApp: IWebApp;
    let app: Express;
    beforeAll(async () => {
        app = express();
        const application = new App();
        try {
            expressApp = await application.startExpress(app);
        } catch (e) {
            console.log(e)
        }
    });
    afterAll(async () => {
       await expressApp.stop();
    });
    const healthUrl = '/health';
    describe(`get ${healthUrl}`, () => {
        const expectedResponse = new GetHealthResponse(true, packageJson.version);
        const expectedStatusCode = 200;

        it(`Status: ${expectedStatusCode}. Response body: ${JSON.stringify(expectedResponse)}.`, async () => {
            // Arrange

            // Act
            const response = await supertest(app).get(healthUrl);

            // Assert
            expect(response.body).toEqual(expectedResponse);
            expect(response.status).toEqual(expectedStatusCode);
        });
    });
});
