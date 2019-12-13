import {ISentryWrapper} from "../error-handling/SentryWrapper";
import IExpressRouter from "./IExpressRouter";

export default interface IWebApp {
    setup(router: IExpressRouter, sentryWrapper: ISentryWrapper): void;
    start(): Promise<void>;
    stop(): Promise<void>;
}
