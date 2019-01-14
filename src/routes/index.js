// const baseRouter = require('./base.route');
// const ServerRouter = require('./server.route');
// const InstanceRouter = require('./instance.route');
// const CarbonModelRouter = require('./carbon-model.route');
// const DataRouter = require('./data.route');
// const LogRouter = require('./log.route');

import net from './net';
import data from './data';
import calc from './calc';
import task from './task';

// const router = new baseRouter();

// router.use('/server', ServerRouter);
// router.use('/instance', InstanceRouter);
// router.use('/services', CarbonModelRouter);
// router.use('/data', DataRouter);
// router.use('/log', LogRouter);

// router.route('/')
//     .get((req, res, next) => {
//         return res.redirect('/index')
//     })

// router.route('/index')
//     .get((req, res, next) => {
//         return res.json({
//             code: 200,
//             data: 'parallel server'
//         })
//     })

export default app => {
    app.use('/net', net);
    app.use('/data', data);
    app.use('/calc', calc);
    app.use('/task', task);
}