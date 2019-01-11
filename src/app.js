import express from 'express';
// import http from 'http';
import router  from './routes/index';
import io from 'socket.io';

import db from '../src/models/db';
import preRouter from './middlewares/pre-request.middleware';
import postRouter from './middlewares/post-response.middleware';
import InstanceCtl from './controllers/instance.controller';
import setting  from './setting';
import chalk from 'chalk';

const app = express();
// http.Server(app);
// const socket = io(http);


preRouter(app);
router(app);
postRouter(app);
// io.on('connection', (socket) => {
//     console.log('client connected');
//     InstanceCtl.emitInstance(socket);

//     socket.on('disconnect', () => {
//         console.log('client io disconnect');
//     });
// })

app.listen(setting.port, () => {
    console.log(
        chalk.green(`\n server is running at ${setting.port} \n`)
    );
});
