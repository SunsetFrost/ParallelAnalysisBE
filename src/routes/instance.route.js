const baseRouter = require('./base.route');
const InstanceCtrl = require('../controllers/instance.controller');

const router = new baseRouter();

router.route('/').get(InstanceCtrl.getInstance);

module.exports = router;