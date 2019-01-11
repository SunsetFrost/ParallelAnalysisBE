import express from 'express';
import Net from '../controllers/net';

const router = express.Router();

router.get('/', Net.getNets);
router.get('/:id', Net.getNetById);
router.post('/add', Net.addNet);
router.post('/update', Net.updateNet);

export default router;