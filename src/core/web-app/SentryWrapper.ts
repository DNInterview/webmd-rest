import {Express} from "express";
import * as http from "http";

export interface ISentryWrapper {
    requestHandler(): (req: http.IncomingMessage, res: http.ServerResponse, next: (error?: any) => void) => void
    errorHandler(): (req: http.IncomingMessage, res: http.ServerResponse, next: (error?: any) => void) => void
}

export default class SentryWrapper implements ISentryWrapper {
    private Sentry = require('@sentry/node');
    constructor() {
        this.Sentry.init({ dsn: 'https://af94a6e74f3645afbf5597007b2ada98@sentry.io/1855763' })
    }

    requestHandler(): (req: http.IncomingMessage, res: http.ServerResponse, next: (error?: any) => void) => void {
        return this.Sentry.Handlers.requestHandler();
    }

    errorHandler(): (req: http.IncomingMessage, res: http.ServerResponse, next: (error?: any) => void) => void {
        return this.Sentry.Handlers.errorHandler();
    }
}