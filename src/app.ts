import express from 'express';
import {router as mobileRouter} from './api/routers/mobileRouter';


export const app = express();

// middlewares

app.use(express.json());

//ENRUTADOR

app.use('/mobiles', mobileRouter);


