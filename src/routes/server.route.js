const baseRouter = require('./base.route');
const ServerCtrl = require('../controllers/server.controller');

const router = new baseRouter();

router.route('/')
    .get(async (req, res, next) => {
        const server = await ServerCtrl.getServer();
        return res.json({
            code: 200,
            data: server
        })
    });

module.exports = router;