const util = require('util');
const fs = require('fs');

const _ = require('lodash');
const mongoose = require('mongoose');

const MongooseBase = require('./mongoose.model');

const server = {
    name: '',
    group: [],
    startTime: '',
    status: '',
    ip: '',
    masterip: '',
    type: '',
    desc: '',
}

class ServerDB extends MongooseBase {
    constructor() {
        const collName = 'Server';
        const schema = {
            name: String,
            group: [String],
            startTime: String,
            status: String,
            ip: String,
            masterip: String,
            type: String,
            desc: String,
        }

        super(collName, schema);
    };
}

const serverDB = new ServerDB();
module.exports.serverDB = serverDB;