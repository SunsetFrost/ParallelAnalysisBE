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
    });

module.exports = router;