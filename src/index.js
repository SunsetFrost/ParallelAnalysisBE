const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const router = require('./routes/index.route');
const preRouter = require('./middlewares/pre-request.middleware');
const postRouter = require('./middlewares/post-response.middleware');
const InstanceCtl = require('./controllers/instance.controller');
const setting = require('./setting');

// app.use(bodyParser.json());



// app.use('/mesos', proxy({
//     target: setting.mesos_ip + setting.mesos_port,
//     changeOrigin: true,
//     pathRewrite: {
//         '^/mesos'   : '',
//     },
//     logLevel: 'debug',
// }));

app.get('/test', (req, res) => {
    console.log('test get');
    res.send({
        id: '27315'
    });
});

// app.post('/instance', async (req, res) => {
//     // const { frameworkid, tasks } = req.body;
//     // const instance = await InstanceCtl.getTask(frameworkid, tasks);
//     // res.send({
//     //     ...instance,
//     // });
//     res.send(InstanceCtl.mockInstance());
// });

preRouter(app);

app.use('/', router);

io.on('connection', (socket) => {
    console.log('client connected');
    InstanceCtl.emitInstance(socket);

    socket.on('disconnect', () => {
        console.log('client io disconnect');
    });
})

postRouter(app);

http.listen(setting.port, () => {
    console.log(`\n server is running at ${setting.port} \n`);
});
