const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const bodyParser = require('body-parser');

const InstanceCtl = require('./controllers/instance');
const setting = require('./setting');

app.use(bodyParser.json());
// all cross origin
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:' + setting.front_port);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'PUT,POST,GET,DELETE,OPTIONS'
    );
    if (req.method == 'OPTIONS') {
        // 预检请求直接返回
        res.send(200);
    } else {
        next();
    }
});

app.use('/mesos', proxy({
    target: setting.mesos_ip + setting.mesos_port,
    changeOrigin: true,
    pathRewrite: {
        '^/mesos'   : '',
    },
    logLevel: 'debug',
}));

app.get('/test', (req, res) => {
    console.log('test get');
    res.send({
        id: '27315'
    });
});

app.post('/instance', async (req, res) => {
    // const { frameworkid, tasks } = req.body;
    // const instance = await InstanceCtl.getTask(frameworkid, tasks);
    // res.send({
    //     ...instance,
    // });
    res.send(InstanceCtl.mockInstance());
});

app.listen(setting.ip);
console.log('server is running');