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
    models: [],
    user: '',
    time: {
        start: '',
        end: '',
        duration: ''
    },
    numTasks: {
        total: -1,
        active: -1,
        completed: -1,
        failed: -1 
    },
    server: [
        {
            id: '',
            name: '',
            hostport: '',
            resource: {
                cpu: '',
                memory: '',
                disk: '',
                maxMemory: ''
            },
            task: {
                total: -1,
                active: -1,
                complete: -1,
                failed: -1
            }
        }
    ],
    status: '' 
}

class InstanceDB extends MongooseBase {
    constructor() {
        const collName = 'Instance';
        const schema = {
            name: String,
            models: [String],
            user: String,
            time: mongoose.Schema.Types.Mixed,
            numTasks: mongoose.Schema.Types.Mixed,
            server: mongoose.Schema.Types.Mixed,
            status: String
        }

        super(collName, schema);
    }
}

const instanceDB = new InstanceDB();
module.exports.instanceDB = instanceDB;