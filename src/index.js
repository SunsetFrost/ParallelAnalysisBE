const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();
const bodyParser = require('body-parser');

const InstanceCtl = require('./controllers/instance')

app.use(bodyParser.json());
// all cross origin
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9035');
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
    target: 'http://172.21.213.110:5050',
    changeOrigin: true,
    pathRewrite: {
        '^/mesos'   : '',
    },
    logLevel: 'debug',
}));

app.get('/test', (req, res) => {
    console.log('test get');
    res.send({
        id: 'wo ri ni ma a'
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

app.listen('9315');
console.log('proxy is running');