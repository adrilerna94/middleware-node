import { type NextFunction, type Request, type Response } from 'express';
import {httpStatus} from '../config/httpStatusCodes.js';

export function checkId(req: Request, res: Response, next: NextFunction) {
  if (req.params.id) {
    const id = Number(req.params.id);
    if (Number.isInteger(id)) {
      res.locals.id = id;
      next();
    } else {
      return res.status(httpStatus.badRequest).send({message: 'Id is not integer.'});
    }
  } else {
    return res.status(httpStatus.badRequest).send({message: 'Missing id param.'});
  }
}
