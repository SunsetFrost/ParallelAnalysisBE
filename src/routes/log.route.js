const baseRouter = require('./base.route');
const LogCtrl = require('../controllers/log.controller');

const router = new baseRouter();

router.route('/')
    .get(async (req, res, next) => {
        const data = await LogCtrl.getLog();
        return res.json({
            code: 200,
            data: data,
        })
    });

module.exports = router;