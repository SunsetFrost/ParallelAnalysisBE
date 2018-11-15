const logDB = require('../models/log.model').logDB;

async function getLog() {
    try {
        const msg = await logDB.find({});
        return msg;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports.getLog = getLog;