import express, {Express, response} from 'express';
import 'jest-extended';
import ExpressApp from "../../../../src/core/web-app/ExpressApp";
import IExpressRouter from "../../../../src/core/web-app/IExpressRouter";
import IWebApp from "../../../../src/core/web-app/IWebApp";
import {ISentryWrapper} from "../../../../src/core/web-app/SentryWrapper";

describe('ExpressApp', () => {
    let expressRouter: IExpressRouter;
    let app: Express;
    let expressApp: IWebApp;
    let sentryWrapper: ISentryWrapper;
    beforeEach(async () => {
        jest.mock('express');
        jest.mock('../../../../src/core/web-app/IExpressRouter');
        app = {} as Express;
        expressRouter = {} as IExpressRouter;
        sentryWrapper = {} as ISentryWrapper;

        expressApp = new ExpressApp(app, expressRouter, sentryWrapper);
    });
    describe('setup()', () => {
        it('sets up Sentry requestHandler, then the routes, then Sentry error handling', async () => {
            // Arrange
            const mockSentrySetupRequestHandler = jest.fn();
            const mockSentrySetupErrorHandler = jest.fn();
            const mockRouterSetup = jest.fn();
            sentryWrapper.setupErrorHandler = mockSentrySetupErrorHandler;
            sentryWrapper.setupRequestHandler = mockSentrySetupRequestHandler;
            expressRouter.setup = mockRouterSetup;

            // Act
            expressApp.setup();

            // Assert
            expect(sentryWrapper.setupRequestHandler).toHaveBeenCalledBefore(mockRouterSetup);
            expect(expressRouter.setup).toHaveBeenCalledBefore(mockSentrySetupErrorHandler);
        });
    });
});
