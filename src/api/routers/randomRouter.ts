import {Router} from 'express'; // importo router
import {randomResponse} from '../controllers/randomController'; //importo funcion controller

// creo randomrouter a traves de llamar a la función de express Router()
export const randomRouter = Router();

randomRouter.get('/:id', randomResponse);
