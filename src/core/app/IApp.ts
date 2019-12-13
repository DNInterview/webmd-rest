import {Express} from "express";
import IWebApp from "../web-app/IWebApp";

export default interface IApp {
    startExpress(app: Express): Promise<IWebApp>;
}
