import {Request, Response} from "express";

export default interface IReadController {
    get(request: Request, response: Response): void;
}
