import express from "express";
import App from "./core/app/App";

const app = new App();
app.startExpress(express());
