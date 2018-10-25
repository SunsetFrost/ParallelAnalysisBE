const baseRouter = require('./base.route');
const CarbonModelCtrl = require('../controllers/carbon-mode.controller');

const router = new baseRouter();

router.route('/invoke').post(CarbonModelCtrl.invokeCarbonModelBySingle);

module.exports = router;