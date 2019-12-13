import {Express} from "express";

export interface ISentryWrapper {
    setupRequestHandler(): void
    setupErrorHandler(): void
}

export default class SentryWrapper implements ISentryWrapper {
    private Sentry = require('@sentry/node');
    constructor(private app: Express) {
        this.Sentry.init({ dsn: 'https://af94a6e74f3645afbf5597007b2ada98@sentry.io/1855763' })
    }

    setupRequestHandler(): void {
        this.app.use(this.Sentry.Handlers.requestHandler());
    }

    setupErrorHandler(): void {
        this.app.use(this.Sentry.Handlers.errorHandler());
    }
}