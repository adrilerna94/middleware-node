import {Request, Response, NextFunction} from 'express';
import { checkMobile } from "./checkMobile";

export const validateMobile = (req: Request, res: Response, next: NextFunction) => {
  // capturamos el objeto del body de la solicitud (POST, PUT)
  const data = req.body;
  // desestructurizamos el objeto checkMobile para acceder a propiedades valid y errors.
  const {valid, errors} = checkMobile(data);
  if (!valid) {
    return res.status(400).json({
      error: 'Invalid data',
      details: errors,
    });
  }
  // Avanzamos al siguiente middleware si cumple
  // con la validacion de checkMobile
  next();
}
