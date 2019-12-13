import { Express } from 'express';
import * as http from "http";

import IWebApp from './IWebApp'
import { EXPRESS_PORT } from './WebAppConstants'
import IExpressRouter from "./IExpressRouter";
import {ISentryWrapper} from "./SentryWrapper";

export default class ExpressApp implements IWebApp {
    private server?: http.Server;
    constructor(private app: Express) {}

    setup(router: IExpressRouter, sentryWrapper: ISentryWrapper): void {
        sentryWrapper.setupRequestHandler();
        router.setup(this.app);
        sentryWrapper.setupErrorHandler();
    }

    start(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(EXPRESS_PORT, err => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                console.log(`server is listening on ${EXPRESS_PORT}`);
                return resolve();
            });
        });
    }

    stop(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.server?.close(err => {
                if (err) {
                    console.error('Error closing server', err);
                    return reject(err)
                }
                console.log('Successfully closed express app');
                return resolve();
            });
        });
    }
}
