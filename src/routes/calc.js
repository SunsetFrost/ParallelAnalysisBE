import express from 'express';
import Calc from '../controllers/calc';

const router = express.Router();

router.get('/', Calc.getCalcs);
router.get('/:id', Calc.getCalcById);
router.post('/add', Calc.addCalc);
router.post('/update', Calc.updateCalc);

export default router;