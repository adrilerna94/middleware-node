import {type Request, type Response, type NextFunction} from 'express';
import { Mobile } from '../interfaces/mobile.interface';
import { mobiles } from '../data/mobiles';

//HACEMOS LAS VALIDACIONES PERTINENTES
  /*
    - ¿QUE HAREMOS?
      - una función que valide cada propiedad (model, price, screenSize).
      - En CPU validaremos cada propiedad del objeto CPU y que a su vez tenga todas propiedades válidas-
      - una función que agrupe todas las validaciones de todos las propiedades y compruebe que todo el objeto mobile que se quiera crear sea correcto.
      MIDDLEWARE
      - Validar el id y usarlo en app.get('/mobile/:id', validateIdMidd, getMobileById)
    - ¿Que validaremos en cada propiedad ?
      - NOT NULL --> !model  / !price ..
      - VALIDAR EL TIPO DE DATO -> Ejemplo: Number.isInteger(req.params.id) /
      - Validar nombre de la propiedad sea correcta. res:  es incorrecta decir que no existe.

  */


// función de validacion con mensajes de error

export function checkMobile (obj: Mobile) : {valid: boolean; errors: string[]} {
  const errors : string[]= [];
  let message : { valid: boolean; errors: string[] } = {valid:true, errors:[]};

  if (!obj || typeof obj !== 'object') {
    message = {valid: false, errors: ['The request body must be an object']};
    return  message;
  }
  if (!obj.model) {
    errors.push('The request must contain a model property.');
  }
  if (typeof obj.model !== 'string') {
    errors.push('Invalid format. Model must be a string type.');
  }
  if (!obj.price) {
    errors.push('The request must contain a price property.');
  }
  if (typeof obj.price !== 'number') {
    errors.push('Invalid format. Price must be a number type.');
  }
  if (!obj.screenSize) {
    errors.push('The request must contain a screenSize property.');
  }
  if (typeof obj.screenSize !== 'number') {
    errors.push('Invalid format. ScreenSize must be a number type.');;
  }
  if (!obj.ram) {
    errors.push('The request must contain a ram property.');;
  }
  if (typeof obj.ram !== 'number') {
    errors.push('Invalid format. Ram must be a number type.');;
  }
  if (!obj.cpu.cores) {
    errors.push('The request must contain a cpu: {cores} property');
  }
  if (typeof obj.cpu.cores !== 'number') {
    errors.push('Invalid format. cpu: {cores} must be a number.');
  }
  if (!obj.cpu.processorFrequency) {
    errors.push('The request must contain a cpu: {processorFrequency} property');
  }
  if (typeof obj.cpu.processorFrequency !== 'string') {
    errors.push('Invalid format. cpu: {processorFrequency} must be a string.');
  }
  if (!obj.cpu.gpuName) {
    errors.push('The request must contain a cpu: {gpuName} property');
  }
  if (typeof obj.cpu.gpuName !== 'string') {
    errors.push('Invalid format. cpu: {gpuName} must be a string.');
  }

  return message;
}
