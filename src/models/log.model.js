const mongoose = require('mongoose');
const MongooseBase = require('./mongoose.model');

const log = {
    type: '', //instance server data
    targetId: '',
    action: '',
    user: '', //  username 
    time: -1,
    detail: '',
}

class LogDB extends MongooseBase {
    constructor() {
        const collName = 'Log';
        const schema = {
            type: String,
            targetId: String,
            action: String,
            user: String,
            time: Number,
            detail: String,
        }

        super(collName, schema);
    }
}

const logDB = new LogDB();
module.exports.logDB = logDB;