import express, {Express} from 'express';
import 'jest-extended';
import ExpressApp from "../../../../src/core/web-app/ExpressApp";
import IExpressRouter from "../../../../src/core/web-app/IExpressRouter";
import IWebApp from "../../../../src/core/web-app/IWebApp";
import {ISentryWrapper} from "../../../../src/core/error-handling/SentryWrapper";

describe('ExpressApp', () => {
    let app: Express;
    let expressApp: IWebApp;
    beforeEach(async () => {
        jest.mock('express');
        jest.mock('../../../../src/core/web-app/IExpressRouter');
        app = {} as Express;

        expressApp = new ExpressApp(app);
    });
    describe('setup()', () => {
        it('sets up Sentry requestHandler, then the routes, then Sentry error handling', async () => {
            // Arrange
            const expressRouter = {} as IExpressRouter;
            const sentryWrapper = {} as ISentryWrapper;

            app.use = jest.fn();
            sentryWrapper.errorHandler = jest.fn();
            sentryWrapper.requestHandler = jest.fn();
            expressRouter.setup = jest.fn();

            // Act
            expressApp.setup(expressRouter, sentryWrapper);

            // Assert
            expect(sentryWrapper.requestHandler).toHaveBeenCalledBefore(expressRouter.setup as jest.Mock);
            expect(expressRouter.setup).toHaveBeenCalledBefore(sentryWrapper.errorHandler as jest.Mock);
            expect(app.use).toHaveBeenNthCalledWith(1, sentryWrapper.requestHandler());
            expect(app.use).toHaveBeenNthCalledWith(2, sentryWrapper.errorHandler());
        });
    });
});
