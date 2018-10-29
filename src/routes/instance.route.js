const baseRouter = require('./base.route');
const InstanceCtrl = require('../controllers/instance.controller');

const router = new baseRouter();

router.route('/')
    .get(async (req, res, next) => {
        const data = await InstanceCtrl.getInstance();
        return res.json({
            code: 200,
            data: data
        })
    })
    .post(async (req, res, next) => {
        if(req.body.task) {
            const instanceId = await InstanceCtrl.createInstanceFromPara(req.body.task);
            return res.json({
                code: 200,
                data: {
                    _id: instanceId
                }
            })
        } else {
            return next(new Error('invalid request body!'));
        }
    });

module.exports = router;