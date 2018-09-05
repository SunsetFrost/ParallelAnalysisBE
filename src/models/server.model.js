const util = require('util');
const fs = require('fs');

const _ = require('lodash');
const mongoose = require('mongoose');

const MongooseBase = require('./mongoose.model');

const server = {
    _id: '',
    name: '',
    group: [],
    startTime: '',
    status: '',
    ip: '',
    masterip: '',
    desc: '',
}

class ServerDB extends MongooseBase {
    constructor() {
        const collName = 'Server';
        const schema = {
            _id: String,
            name: String,
            group: [String],
            startTime: String,
            ip: String,
            masterip: String,
            desc: String,
        }

        super(collName, schema);
    };
}

const serverDB = new ServerDB();
module.exports.serverDB = serverDB;