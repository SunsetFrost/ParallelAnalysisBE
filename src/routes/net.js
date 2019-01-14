import express from 'express';
import Net from '../controllers/net';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const nets = await Net.getNets();
    res.send({
        status: 200,
        data: nets
    })
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const net = await Net.getNetById(id);
    res.send({
        status: 200,
        data: net
    })
});

router.post('/add', async (req, res, next) => {
    const newNet = req.body;
    const data = await Net.addNet(newNet);
    res.send({
        status: 200,
        success: '创建网络任务成功',
        data
     })
});

router.post('/update', async (req, res, next) => {
    const {id, newPc} = req.body;
    const data = await Net.updateNet(id, newPc);
    res.send({
        status: 200,
        success: '更新网络任务成功',
        data
    })
});

export default router;