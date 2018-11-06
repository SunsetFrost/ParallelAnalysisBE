const fetch = require('isomorphic-fetch');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const setTimeoutPromise = util.promisify(require('timers').setTimeout);
const process = require('process');
const moment = require('moment');
const { ObjectID } = require('mongodb');
const setting = require('../setting');
const instanceDB = require('../models/instance.model').instanceDB;
const SparkCtrl = require('./spark.controller');

async function getInstance() {
    try {
        const result = await instanceDB.find({});

        return result;
    } catch(error) {
        console.log(error);
    }
}

async function getInstanceById(insId) {
    try {
        const where = { _id: ObjectID(insId) };
        const res = await instanceDB.find(where);
        return res[0];
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function createInstanceFromCmp(cmodelInstance) {
    const newInstance = {
        //...cmodelInstance,
        name: 'ParallelCompareTask' + Math.floor(Math.random() * Math.floor(100)),
        cpu: '2',
        mem: '2',
        startTime: new Date().getTime(),
        status: 'init',
        sites: ['1', '2', '3'],
        completeNum: '0',
        totalNum: '3'
    }
    try {
        const msg = await instanceDB.insert(newInstance);
    } catch (error) {
        console.log(error);
    }
} 

function transformTask(task) {
    const site2array = (siteStart, siteEnd) => {
        let array = [];
        for(let i = siteStart; i <= siteEnd; i++) {
            array.push(i);
        }
        return array;
    };

    return {
        name: task.name,
        modelCfg: {
            models: [task.model],
            time: {
                start: moment(task.time[0], 'YYYY/MM/DD'),
                end: moment(task.time[1], 'YYYY/MM/DD'),
            },
            sites: site2array(task.siteStart, task.siteEnd),
        },
        parallCfg: {
            mode: task.mode,
            cpuCfg: task.cpu,
            memCfg: task.mem,
        },
        time: {
            start: task.createTime,
        },
        user: task.user.name,
        status: 'INIT',
    }
}

async function createInstanceFromPara(task) {
    const newInstance = transformTask(task);
    try {
        const msg = await instanceDB.insert(newInstance);
        return msg;
    } catch (error) {
        console.log(error); 
        return false;
    } 
}

async function updateInstanceOfCompare(taskId, state, progress) {
    const mongoUrl = `mongodb://${setting.compare_db.ip}:${setting.compare_db.port} ${setting.compare_db.name} Calcu_Task`;
    const invokePython = `python compareInstanceHelper.py ${taskId}  ${state} ${progress} ${mongoUrl}`;
    //config python directory
    const pDir = process.cwd() + '\\src\\tools';
    const options = {
        cwd: pDir,
    }
    try {
        await exec(invokePython, options);    
    } catch (error) {
        console.log(error);
        return('update compare status error');
    }
}

exports.updateInstnaceStatus = async (insId, status) => {
    try {
        const where = {
            _id: ObjectID(insId)
        }
        const update = {
            $set: {
                status: status
            }
        }
        const msg = await instanceDB.update(where, update);
    } catch (error) {
        console.log(error);
        return false;
    }
}

exports.startInstance = async (insId) => {
    try {
        const ins = await getInstanceById(insId);
        //mock spark config data
        const sparkConf = {
            totalNum: 100,
            speed: 1
        };

        let isFinished = false; 
        while(!isFinished) {
            const completeNum = await SparkCtrl.mockSpark(ins.time.start, Date.now(), sparkConf.totalNum, sparkConf.speed);        
            if(completeNum >= sparkConf.totalNum) {
                isFinished = true;
            }
            await setTimeoutPromise(2000, completeNum, sparkConf.totalNum).then((complete, total) => {
                console.log(`model is running, progress is ${completeNum} of ${sparkConf.totalNum}`);
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }

}

module.exports.getInstance = getInstance;
module.exports.getInstanceById = getInstanceById;
module.exports.createInstanceFromCmp = createInstanceFromCmp;
module.exports.createInstanceFromPara = createInstanceFromPara;
module.exports.updateInstanceOfCompare = updateInstanceOfCompare;