import express from 'express';
import Data from '../controllers/data'

const router = express.Router();

router.get('/', Data.getDatas);
router.get('/:id', Data.getDataById);
router.post('/add', Data.addData);
router.post('update', Data.updateData);

export default router;