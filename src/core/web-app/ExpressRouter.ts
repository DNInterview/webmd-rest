import {Express} from "express";
import IExpressRouter from "./IExpressRouter";
import {HEALTH_URL} from "./WebAppConstants";
import IReadController from "../IReadController";

export default class ExpressRouter implements IExpressRouter {
    constructor(private healthController: IReadController){}
    setup(app: Express): void {
        app.get(HEALTH_URL, this.healthController.get);
    }
}