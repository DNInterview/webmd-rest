import {Express} from "express";
import HealthController from "../health/HealthController";
import ExpressRouter from "./web-app/ExpressRouter";
import ExpressApp from "./web-app/ExpressApp";
import SentryWrapper from "./web-app/SentryWrapper";
import IApp from "./IApp";
import IWebApp from "./web-app/IWebApp";

export default class App implements IApp{
    async startExpress(app: Express): Promise<IWebApp> {
        const healthController = new HealthController();
        const router = new ExpressRouter(healthController);
        const sentryWrapper = new SentryWrapper(app);
        const expressApp = new ExpressApp(app);
        expressApp.setup(router, sentryWrapper);
        await expressApp.start();
        return expressApp;
    }
}