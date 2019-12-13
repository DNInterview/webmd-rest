import { Express } from "express";

export default interface IErrorMonitor {
    setup(app: Express): void
}
