const express = require('express');

const router = express.Router();

module.exports = class baseRouter {
    constructor() {
        const router = express.Router();

        router.route('/ping')
        .get((req, res, next) => {
            res.locals.succeed = true;
            res.locals.resData = [{
                href: req.originalUrl
            }];
            return next();
        });
        return router;
    }
};