const baseRouter = require('./base.route');
const DataCtrl = require('../controllers/data.controller');

const router = new baseRouter();

router.route('/')
    .get(async (req, res, next) => {
        const data = await DataCtrl.getData();
        return res.json({
            code: 200,
            data: data
        })
    });

router.route('/download')
    .get(async (req, res, next) => {
        const msrId = req.query.msrId;
        const eventId = req.query.eventId;
        if(msrId && eventId) {
            let {stream, fname} = await DataCtrl.download(msrId, eventId);
            res.set({
                'Content-Type': 'file/*',
                'Content-Disposition':
                    'attachment;filename' +
                    (fname)
            });
            return stream.pipe(res);
        } else {
            return res.json({
                code: 400,
                desc: 'invalid query params'
            })
        }
    });

module.exports = router;