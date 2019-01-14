import express from 'express';
import Task from '../controllers/task';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const tasks = await Task.getTasks();
    res.send({
        status: 200,
        data: tasks
    })
})

router.get('/start', async(req, res, next) => {
    try {
        const id = req.query.id;
        const ins = await Task.startTaskById(id);
        res.send({
            data: ins
        })
    } catch (error) {
        const test = error;
    }

})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const task = await Task.getTaskById(id);
    res.send({
        status: 200,
        data: task
    })
})

router.post('/add', async(req, res, next) => {
    const newTask = req.body;
    const data = await Task.addTask(newTask);
    res.send({
        status: 200,
        data
    })
})

router.post('/update', async(req, res, next) => {
    const {id, task} = req.body;
    const data = await Task.updateTask(id, task);
    res.send({
        status: 200,
        data
    })
})

export default router;