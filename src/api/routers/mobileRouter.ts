import Router from 'express';
import { getAllMobiles, createMobile, getMobileById, updateMobile, deleteMobile } from "../controllers/mobileController";
import { checkId } from "../middlewares/checkId";
import { validateMobile } from "../middlewares/validateMobile";


export const router = Router();

// no hace falta poner create/update/delete porque ya el mismo tipo de método hTTP nos lo indica.
router.get('/', getAllMobiles);
router.get('/:id', checkId, getMobileById);
router.post('/', validateMobile, createMobile);
router.put('/:id', checkId, updateMobile);
router.delete('/:id', checkId, deleteMobile);
