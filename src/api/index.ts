import express, { Router } from 'express';
import {userRouter} from './routers/userRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const apiRouter = Router();

// Per obtenir el body en format json
apiRouter.use(express.json());

apiRouter.use('/users', userRouter);
// apiRouter.use('/films', filmRouter);

apiRouter.use(errorMiddleware);

export default apiRouter;
