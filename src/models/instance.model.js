const util = require('util');
const fs = require('fs');

const _ = require('lodash');
const mongoose = require('mongoose');

const MongooseBase = require('./mongoose.model');

const instance = {
    _id: '',
    name: '',
    cpu: '',
    mem: '',
    startTime: '',
    status: '',
    sites: [],
    completeNum: '',
    totalNum: ''
}

class InstanceDB extends MongooseBase {
    constructor() {
        const collName = 'Instance';
        const schema = {
            _id: String,
            name: String,
            cpu: String,
            mem: String,
            startTime: String,
            status: String,
            sites: [String],
            completeNum: String,
            totalNum: String
        }

        super(collName, schema);
    }
}

const instanceDB = new InstanceDB();
module.exports.instanceDB = instanceDB;