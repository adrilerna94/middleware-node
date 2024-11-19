import { Request, Response, NextFunction } from 'express';

export const verifyCredential = (req: Request, res: Response, next: NextFunction) => {
  const credential = req.headers['authorization']?.trim(); // Siempre usa 'authorization' en minúsculas
  // console.log('Headers:', req.headers);
  // console.log('Authorization header:', credential);

    if (credential !== 'mi-credencial') {
        return res.status(403).json({ message: 'Unauthorized. Missing or incorrect credential.' });
    }
    // Continue to the next middleware or controller
    next();
};
