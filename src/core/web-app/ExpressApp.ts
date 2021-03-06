import { Express } from "express";
import * as http from "http";

import {ISentryWrapper} from "../error-handling/SentryWrapper";
import IExpressRouter from "./IExpressRouter";
import IWebApp from "./IWebApp";
import { EXPRESS_PORT } from "./WebAppConstants";

export default class ExpressApp implements IWebApp {
    private server?: http.Server;
    constructor(private app: Express) {}

    public setup(router: IExpressRouter, sentryWrapper: ISentryWrapper): void {
        this.app.use(sentryWrapper.requestHandler());
        router.setup(this.app);
        this.app.use(sentryWrapper.errorHandler());
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(EXPRESS_PORT, (err) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                console.log(`server is listening on ${EXPRESS_PORT}`);
                return resolve();
            });
        });
    }

    public stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server?.close((err) => {
                if (err) {
                    console.error("Error closing server", err);
                    return reject(err);
                }
                console.log("Successfully closed express app");
                return resolve();
            });
        });
    }
}
