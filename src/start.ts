import express from 'express';
import ExpressApp from './core/web-app/ExpressApp';

const app = express();
const expressApp = new ExpressApp(app);
expressApp.setup();
expressApp.start();