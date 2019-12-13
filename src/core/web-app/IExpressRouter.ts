import {Express} from "express";

export default interface IExpressRouter {
    setup(app: Express): void;
}
