import axios from 'axios';
import express from 'express';
import appPackage from '../../package.json';
import { ExpressApp } from "../../src/core/web-app/ExpressApp";

describe('start.ts', () => {
    let expressApp: ExpressApp;
    beforeAll(async () => {
        let app = express();
        expressApp = new ExpressApp(app);
        expressApp.setup();
        await expressApp.start();
    });
    afterAll(async () => {
       await expressApp.stop();
    });
    const healthUrl = '/health';
    describe(`get ${healthUrl}`, () => {
        it('response with version number', async () => {
            // Arrange
            const expectedResponse = {
                healthy: true,
                version: appPackage.version,
            };

            // Act
            const response = await axios.get(healthUrl);

            // Assert
            expect(response.data).toEqual(expectedResponse);
        });
    });
});
