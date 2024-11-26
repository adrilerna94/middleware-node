import {type Request, type Response} from 'express';
import { mobiles } from '../config/mobiles';
import { httpStatus } from '../config/httpStatusCodes';


// (GET)
export const getAllMobiles = (req:Request, res:Response) => {
  //enviamos la respuesta en formato json de todos los mobiles
  res.json(mobiles);
};

//(POST)
export const createMobile = (req: Request, res: Response) => {
  // necesitaremos app.use(express.json()) ==> Per obtenir el body en format json

  // necesitaríamos archivo a parte para hacer validaciones de cada propiedad
  // y posteriormente validar que estan todas las propiedades con sus valores definidos
  const {model} = req.body;
  const {price} = req.body;
  const {screenSize} = req.body;
  const {ram} = req.body;

  // desestructuración en 2 pasos si necesitas acceder a las propiedades de cpu
  const {cpu} = req.body; // desestructuro mobiles array para acceder a objeto cpu
  const {cores, gpuName, processorFrequency} = cpu; //desestrurizamos cpu propiedad (orden no importa--accedes a través de propiedades)


  // desestructuración en 1 paso si necesitas solo cpu como objeto completo
  //const { cpu: { cores, gpuName, processorFrequency } } = req.body;

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

  // ej validacion !propiedad -> NOT NULL
  if (!model) {
    return res.status(400).json({ message: "El campo 'model' es requerido" });
  }
  // SI LA FUNCION VALIDADORA GENERAL IS TRUE
  const mobile = {id : mobiles.length + 1, model, price, screenSize, ram, cpu : {cores, gpuName, processorFrequency}};
  // con spread operator
  // const newMobile = [...mobiles, mobile]; // expando array mobiles y agrego al final objeto mobile --> hago una copia del array y lo guardo en otro array.

  mobiles.push(mobile); // añadimos newMobile al final del array // modifico el array original mobiles
  //res.status(201) //otra forma de hacerlo sin una librería o array httpStatusCodes.
  res.status(httpStatus.created).json(mobile);

};

// leer solo 1 mobile por ID (GET)
export const getMobileById = (req: Request , res: Response) => {
  const {id} = req.params;
  const mobile = mobiles.find((mobile) => mobile.id === parseInt(id));
  if (!mobile) {
    return res.status(404).json({ERROR: `Mobile with ID: ${id} not found`});
  }
  res.json(mobile); // devolvemos en formato JSON el mobile con el ID que el usuario solicitó
};

//(PUT) --> Actualizar un mobile
export const updateMobile = (req: Request, res: Response) => {
  const {id} = req.params; // recogemos de la url de la request
  const {model} = req.body;
  const {price} = req.body;
  const {screenSize} = req.body;
  const {ram} = req.body;
  const {cpu} = req.body;
  const {cores, gpuName, processorFrequency} = cpu;

  //buscamos si el id de la url coincide con algun id de mobiles con findIndex
  const mobileIndex = mobiles.findIndex((mobile) => mobile.id === Number(id));
  if(mobileIndex === -1){
    return res.status(404).json({ERROR: `mobile not found with ID: ${id}`})
  }
  if (!model) {
    return res.status(400).json({required : `${model} is required`});
  }
  mobiles[mobileIndex].model = model;
  mobiles[mobileIndex].price = price;

  const mobileUpdated = mobiles[mobileIndex];

  res.json(mobileUpdated);
};

// eliminar un elemento (DELETE)
export const deleteItem = (req: Request, res: Response) => {
  const {id} = req.params;
  const mobileIndex = mobiles.findIndex((x) => x.id === Number(id));
  if (mobileIndex === -1) {
    return res.status(404).json({ERROR: `mobile not found with ID: ${id}`})
  }
  const deletedMobile= mobiles.splice(mobileIndex,1);
  if (deletedMobile.length > 0) { // nos aseguramos de que se realmente se eliminó
    // Respondemos con un objeto más detallado
    res.json({
        message: 'Mobile deleted successfully!',
        deletedMobile: deletedMobile[0], // Incluimos el objeto eliminado directamente
    });
  } else {
    // En caso de no encontrar el índice, devolvemos un error
    res.status(404).json({
        message: 'Mobile not found. No deletion occurred.',
    });
  }
}
