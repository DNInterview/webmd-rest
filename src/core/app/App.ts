import {Express} from "express";
import HealthController from "../../health/HealthController";
import {SENTRY_DSN} from "../error-handling/ErrorHandlingConstants";
import SentryWrapper from "../error-handling/SentryWrapper";
import ExpressApp from "../web-app/ExpressApp";
import ExpressRouter from "../web-app/ExpressRouter";
import IWebApp from "../web-app/IWebApp";
import IApp from "./IApp";

export default class App implements IApp {
    public async startExpress(app: Express): Promise<IWebApp> {
        const healthController = new HealthController();
        const router = new ExpressRouter(healthController);

        const sentryWrapper = new SentryWrapper(SENTRY_DSN);
        const expressApp = new ExpressApp(app);
        expressApp.setup(router, sentryWrapper);
        await expressApp.start();
        return expressApp;
    }
}
