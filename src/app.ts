import express from 'express';
import {router as mobileRouter} from './api/routers/mobileRouter';
import errorMiddleware from './api/middlewares/errorMiddleware';


export const app = express();

// middlewares

app.use(express.json());

//ENRUTADOR

app.use('/mobiles', mobileRouter);

app.use(errorMiddleware);
