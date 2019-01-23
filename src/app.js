import express from "express";
import io from "socket.io";
import chalk from "chalk";
import expressAsyncErrors from "express-async-errors";

import router from "./routes/index";
import preRouter from "./middlewares/pre-request.middleware";
import postRouter from "./middlewares/post-response.middleware";
import setting from "./setting";
import db from "./models/db";

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
    console.log(chalk.green(`\nserver is running at ${setting.port} \n`));
});
