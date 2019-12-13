import {Request, Response} from "express";

import appPackage from "../../package.json";
import IReadController from "../core/controllers/IReadController";
import GetHealthResponse from "./GetHealthResponse";

export default class HealthController implements IReadController {
    public get(request: Request, response: Response): void {
        const healthResponse = new GetHealthResponse(true, appPackage.version);
        response.send(healthResponse);
    }
}
