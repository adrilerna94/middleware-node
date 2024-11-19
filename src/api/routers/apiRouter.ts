import express from 'express';
import Router from 'express';
import userRouter from './userRouter';
//import { randomRouter } from './randomRouter';
import errorMiddleware from '../middlewares/errorMiddleware';
import { randomRouter } from './randomRouter';
//ej 2- gpt
import { getCombination } from '../controllers/combinationController';
import { verifyCredential } from '../middlewares/authMiddleware';



const apiRouter = Router();

// Per obtenir el body en format json
apiRouter.use(express.json());

apiRouter.use('/users', userRouter);
// apiRouter.use('/films', filmRouter);

//GPT
apiRouter.put('/combination', verifyCredential, getCombination);

apiRouter.use('/random', randomRouter);

apiRouter.use(errorMiddleware);

export default apiRouter;
