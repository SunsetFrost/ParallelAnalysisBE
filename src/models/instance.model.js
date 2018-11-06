const mongoose = require('mongoose');
const MongooseBase = require('./mongoose.model');

/* 
    Instance Status
    'INIT',
    'START_PENDING',  从开始计算 到spark任务创建成功之间
    'START_FAILED',
    'RUNNING',
    'FINISHED_FAILED',
    'FINISHED_SUCCEED'
*/

const instance = {
    name: '',
    modelCfg: {
        models: [
            '',
        ],
        time: {
            start: '',
            end: '',
        },
        sites: [
            '',
        ],
        data: '',
        parms: '',
    },
    parallCfg: {
        mode: '', // standalone cluster
        server: [
            '',
        ],
        cpuCfg: '',// fix  max min 
        memCfg: '',
        advanceCfg: {
            // TODO  custom every server config
        },
    },
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
    user: '',
    status: '' 
}

class InstanceDB extends MongooseBase {
    constructor() {
        const collName = 'Instance';
        const schema = {
            name: String,
            modelCfg: mongoose.Schema.Types.Mixed,
            parallCfg: mongoose.Schema.Types.Mixed,
            time: mongoose.Schema.Types.Mixed,
            numTasks: mongoose.Schema.Types.Mixed,
            server: mongoose.Schema.Types.Mixed,
            user: String,
            status: String
        }

        super(collName, schema);
    }
}

const instanceDB = new InstanceDB();
module.exports.instanceDB = instanceDB;