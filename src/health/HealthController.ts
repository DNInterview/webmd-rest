import {Request, Response} from "express";

import IReadController from "../core/IReadController";
import GetHealthResponse from "./GetHealthResponse";
import appPackage from "../../package.json";

export default class HealthController implements IReadController {
    get(request: Request, response: Response): void {
        const healthResponse = new GetHealthResponse(true, appPackage.version);
        response.send(healthResponse);
    }
}