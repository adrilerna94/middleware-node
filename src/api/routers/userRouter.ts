import { Router } from 'express';
import { checkId } from '../middlewares/checkId';
import { helloWorld, getUsers, createUser, getUsersPage, getUserById } from '../controllers/userController.js';

const userRouter = Router();

userRouter.get('/helloworld', helloWorld);
userRouter.get('/', getUsers);
userRouter.post('/', createUser);
// userRouter.put('/', createUser);
// userRouter.delete('/', createUser);
userRouter.get('/pagination', getUsersPage);
userRouter.get('/:id',
  checkId,
  getUserById
);
// userRouter.get('/user/:id?', getUserById);

export default userRouter;
