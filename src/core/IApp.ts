import IWebApp from "./web-app/IWebApp";
import {Express} from "express";

export default interface IApp {
    startExpress(app: Express): Promise<IWebApp>
}