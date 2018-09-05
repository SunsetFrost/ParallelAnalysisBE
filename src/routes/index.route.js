const baseRouter = require('./base.route');
const ServerRouter = require('./server.route');
const InstanceRouter = require('./instance.route');

const router = new baseRouter();

router.use('/server', ServerRouter);
router.use('/instance', InstanceRouter);

module.exports = router;