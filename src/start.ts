import express from 'express';
import App from './core/App';

const app = new App();
app.startExpress(express());
