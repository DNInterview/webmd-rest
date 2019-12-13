import { Express } from 'express';
import * as http from "http";

import appPackage from '../../../package.json'
import { IWebApp } from './IWebApp'
import { EXPRESS_PORT } from './WebAppConstants'
import {GetHealthResponse} from "../../responses/GetHealthResponse";

export class ExpressApp implements IWebApp {
    private server?: http.Server;
    constructor(private app: Express) {}

    setup(): void {
        this.app.get('/health', (req, res) => {
            const response = new GetHealthResponse(true, appPackage.version);
            res.send(response);
        });
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
