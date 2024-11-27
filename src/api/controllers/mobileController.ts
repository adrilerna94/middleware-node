import {type Request, type Response} from 'express';
import { mobiles } from '../data/mobiles';

// (GET)
export const getAllMobiles = (req:Request, res:Response) => {
  //enviamos la respuesta en formato json de todos los mobiles
  res.json(mobiles);
};


//(POST)
export const createMobile = (req: Request, res: Response) => {

  // Capturamos el objeto por el body. ya validado por el middleware
  const mobile = req.body;
  let newId = 1;
  // Generar un nuevo objeto con un ID único. se añadirá siempre al ultimo id

  // Si hay elementos en el array de móviles, obtenemos el último ID y le sumamos 1.
  //Si el array está vacío, el primer ID será 1.
  if(mobiles.length > 0) {
    const lastMobile = mobiles[mobiles.length - 1];
    // verificamos que el id no sea null- nos obliga ts
    if (lastMobile.id !== undefined) {
      newId = lastMobile.id + 1;//el nuevo ID será el siguiente al último
    }

  }
  // alternativa compacta ➡️ let newId = mobiles.length > 0 ? mobiles[mobiles.length - 1].id + 1 : 1;

  // creamos mobile a partir ID calculado
  const newMobile = { id: newId, ...mobile };

  try {
    mobiles.push(newMobile); //añadimos al array global de mobiles
    // enviamos respuesta al cliente
    res.status(201).json({
      message: `Mobile with model : ${mobile.model} was added succesfully!`,
      data: mobile,
    });
  } catch (error) {
    // capturamos el error del servidor
    res.status(500).json({
      message:'Failes to add mobile',
      error: error.message,
    });
  }

};

// leer solo 1 mobile por ID (GET)

// utilizaremos el checkId middleware
export const getMobileById = (req: Request , res: Response) => {
  const id = res.locals.id; // recogemos el id del middleware checkId
  const mobile = mobiles.find((mobile) => mobile.id === parseInt(id));
  if (!mobile) {
    return res.status(404).json({ERROR: `Mobile with ID: ${id} not found`});
  }
  res.json(mobile); // devolvemos en formato JSON el mobile con el ID que el usuario solicitó
};

//(PUT) --> Actualizar un mobile

// USAREMOS CHECKID para validarlo como middleware antes
export const updateMobile = (req: Request, res: Response) => {

  const id = res.locals.id; // recogemos el id del middleware checkId

  // guardamos el req body en variable
  const mobileToUpdate = req.body;

  // Encontrar el índice del móvil en el array
  const mobileIndex = mobiles.findIndex((mobile) => mobile.id === Number(id));
  if(mobileIndex === -1){
    return res.status(404).json({ERROR: `mobile not found with ID: ${id}`})
  }
  // Actualizamos móvil en el array con datos nuevos --> {...} desestructurizamos por seguridad.
  // Nos aseguramos de que el id del objeto existente no se modifique,
  // incluso si el cliente incluye un id diferente en el cuerpo de la solicitud.
  // Si el cliente no envía todas las propiedades del objeto (como model o price), esas propiedades se perderán.

  // AQUI HACEMOS COPIA NO MODIFICAMOS ARRAY MOBILES ORIGINAL
  //mobiles[mobileIndex] = {...mobiles[mobileIndex], ...mobileToUpdate, id: mobiles[mobileIndex].id};
  mobiles[mobileIndex] = mobileToUpdate;

  // Devolver el móvil actualizado
  res.status(200).json({
    message: `Mobile with ID: ${id} was updated successfully.`,
    data: mobiles[mobileIndex],
  });
};


// FALTA CHECKEAR
// eliminar un elemento (DELETE)
export const deleteMobile = (req: Request, res: Response) => {
  const {id} = req.params; // ID url

  // Encontrar el índice del móvil en el array
  const mobileIndex = mobiles.findIndex((x) => x.id === Number(id));

  // Si no se encuentra el móvil, devolver un error 404
  if (mobileIndex === -1) {
    return res.status(404).json({
      error: `mobile not found with ID: ${id}`,
    });
  }
  //elmininar mobile y capturarlo desestructurizando el array.
  const [deletedMobile]= mobiles.splice(mobileIndex,1);
  //saveMobilesToFile();

  // mobiles = mobiles.filter((e) => e.id !== Number(id))

  // responder con el objeto eliminado
  res.status(200).json({
    message: 'Mobile deleted successfully!',
    deletedMobile,
  });

}
