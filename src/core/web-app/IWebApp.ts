import IExpressRouter from "./IExpressRouter";
import {ISentryWrapper} from "./SentryWrapper";

export default interface IWebApp {
    setup(router: IExpressRouter, sentryWrapper: ISentryWrapper): void
    start(): Promise<void>
    stop(): Promise<void>
}
