const util = require('util');
const fs = require('fs');

const _ = require('lodash');
const mongoose = require('mongoose');

const MongooseBase = require('./mongoose.model');

/* 
    Instance Status
    'INIT',
    'COULD_START',
    'START_PENDING',
    'START_FAILED',
    'RUNNING',
    'FINISHED_FAILED',
    'FINISHED_SUCCEED'
*/
const instance = {
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