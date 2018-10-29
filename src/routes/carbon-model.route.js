const baseRouter = require('./base.route');
const CarbonModelCtrl = require('../controllers/carbon-mode.controller');

const router = new baseRouter();

router.route('/')
    .get(async (req, res, next) => {
        const data = await CarbonModelCtrl.getCarbonModel();
        return res.json({
            code: 200,
            data: data  
        })
    });
router.route('/invoke')
    .post(async (req, res, next) => {
        const reqInstance = req.body.msInstance;
        await CarbonModelCtrl.invokeCarbonModelBySingle(reqInstance);
        return res.json({
            code: 200
        })
    });

module.exports = router;