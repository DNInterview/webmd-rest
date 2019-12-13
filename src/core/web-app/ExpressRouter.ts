import {Express} from "express";
import IReadController from "../controllers/IReadController";
import IExpressRouter from "./IExpressRouter";
import {HEALTH_URL} from "./WebAppConstants";

export default class ExpressRouter implements IExpressRouter {
    constructor(private healthController: IReadController) {}
    public setup(app: Express): void {
        app.get(HEALTH_URL, this.healthController.get);
    }
}
