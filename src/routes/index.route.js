const baseRouter = require('./base.route');
const ServerRouter = require('./server.route');
const InstanceRouter = require('./instance.route');
const CarbonModelRouter = require('./carbon-model.route');

const router = new baseRouter();

router.use('/server', ServerRouter);
router.use('/instance', InstanceRouter);
router.use('/services', CarbonModelRouter);

router.route('/')
    .get((req, res, next) => {
        return res.redirect('/index')
    })

router.route('/index')
    .get((req, res, next) => {
        return res.json({
            code: 200,
            data: 'parallel server'
        })
    })

module.exports = router;