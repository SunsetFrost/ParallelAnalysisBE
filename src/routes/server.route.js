const baseRouter = require('./base.route');
const ServerCtrl = require('../controllers/server.controller');

const router = new baseRouter();

router.route('/').get(ServerCtrl.getServer);

module.exports = router;