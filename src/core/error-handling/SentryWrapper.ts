import {ExpressRouteMiddleware} from "../web-app/ExpressTypes";

export interface ISentryWrapper {
    requestHandler(): ExpressRouteMiddleware;
    errorHandler(): ExpressRouteMiddleware;
}

export default class SentryWrapper implements ISentryWrapper {
    private Sentry = require("@sentry/node");
    constructor(dsn: string) {
        this.Sentry.init({ dsn });
    }

    public requestHandler(): ExpressRouteMiddleware {
        return this.Sentry.Handlers.requestHandler();
    }

    public errorHandler(): ExpressRouteMiddleware {
        return this.Sentry.Handlers.errorHandler();
    }
}
