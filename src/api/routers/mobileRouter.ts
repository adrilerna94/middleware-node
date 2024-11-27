import Router from 'express';
import { getAllMobiles, createMobile, getMobileById, updateMobile, deleteMobile } from "../controllers/mobileController";
import { checkId } from "../middlewares/checkId";
import { validateMobile } from "../middlewares/validateMobile";


export const router = Router();

router.get('/', getAllMobiles);
router.get('/:id', checkId, getMobileById);
router.post('/create', validateMobile, createMobile);
router.put('/update/:id', checkId, updateMobile);
router.delete('/delete/:id', checkId, deleteMobile);
