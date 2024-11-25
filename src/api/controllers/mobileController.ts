import {type Request, type Response} from 'express';
import { mobiles } from '../config/mobiles';


export const getAllMobiles = (req:Request, res:Response) => {
  //enviamos la respuesta en formato json de todos los mobiles
  res.json(mobiles);
};

export const createMobile = (req: Request, res: Response) => {
  // necesitaremos app.use(express.json()) ==> Per obtenir el body en format json

  // necesitaríamos archivo a parte para hacer validaciones de cada propiedad
  // y posteriormente validar que estan todas las propiedades con sus valores definidos
  const {model} = req.body;
  const {price} = req.body;
  const {screenSize} = req.body;
  const {cpu} = req.body; // desestructuro mobiles array para acceder a cpu
  const {cores, gpuName, processorFrequency} = cpu; //desestrurizamos cpu propiedad (orden no importa--accedes a través de propiedades)



};
