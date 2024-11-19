//importamos tipos Request/Response/NextFunction
import {type Request, type Response} from 'express';
import { isValidRandom} from '../middlewares/checkRandomId';

//Importamos funcion httpStatus que simula libreria httpStatus
//ej httpStatus.badRequest == 400

export function random (max : number) {
  if (max === 1) {
    return Math.random();
  }
  if (max >= 1 && max <= 10){
    return Math.random() * (max - 1) + 1;
  }
  return Math.floor(Math.random() * max) + 1;
}

export function randomResponse (req: Request, res: Response) {
  const {id} = req.params;
  const num: number = Number(id);
  if (!isValidRandom(num)){
    return res.status(404).send({error : 'Id is invalid. Valid ids are >= 1'});
  }
  if (num === 1){
    return res.json({
      [`Random number between 0 and ${num}`]: random(num),
    });
  }
  return res.json({
    [`Random number between 1 and ${num}`]: random(num),
  });

}

