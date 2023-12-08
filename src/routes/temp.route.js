import express from 'express';
import { myLogger, tempTest, tempException, tempDatabase } from '../controllers/temp.controller.js';
import { status } from '../../config/response.status.js';
import { BaseError } from '../../config/error.js';

export const tempRouter = express.Router();

tempRouter.get('/test', tempTest);


tempRouter.use(myLogger);

tempRouter.get('/', (req, res) => {
    console.log("/");
    res.send('Hello UMC!');
});

tempRouter.get('/hello', (req, res) => {
    console.log("/hello");
    throw new BaseError(status.BAD_REQUEST);
});


tempRouter.get('/exception/:flag',tempException);

tempRouter.get('/test/db', tempDatabase);