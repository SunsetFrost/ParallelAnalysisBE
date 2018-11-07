const fetch = require('isomorphic-fetch');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const setTimeoutPromise = util.promisify(require('timers').setTimeout);
const process = require('process');
const moment = require('moment');
const { ObjectID } = require('mongodb');
const setting = require('../setting');
const instanceDB = require('../models/instance.model').instanceDB;
const instanceInit = require('../models/instance.model').init;
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
        ...instanceInit,
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

async function updateInstnaceStatus(insId, status) {
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

/* 
 * 轮询 从spark ctrl获取对应instance进度 并 更新数据库
 */
exports.startInstance = async (insId) => {
    try {
        const ins = await getInstanceById(insId);

        // change status to start_pending
        updateInstnaceStatus(insId, 'START_PENDING');
        await setTimeoutPromise(4000);

        // mock spark config data
        const sparkConf = {
            totalNum: 100,
            speed: 1
        };

        // polling spark running progress
        let isFinished = false; 
        while(!isFinished) {
            const completeNum = await SparkCtrl.mockSpark(ins.time.start, Date.now(), sparkConf.totalNum, sparkConf.speed);  

            const num = {
                total: sparkConf.totalNum,
                active: 0,
                completed: completeNum,
                failed: 0
            }

            if(completeNum > 0 && completeNum < num.total) {
                //update db
                const where = {
                    _id: ObjectID(ins._id)
                }
                const update = {
                    $set: {
                        numTasks: num,
                        status: 'RUNNING'
                    }
                }
                const msg = await instanceDB.update(where, update);
            }
            if(completeNum >= num.total) {
                isFinished = true;
                //update db
                const where = {
                    _id: ObjectID(ins._id)
                }
                const update = {
                    $set: {
                        numTasks: num,
                        status: 'FINISHED_SUCCEED'
                    }
                }
                const msg = await instanceDB.update(where, update);
            }

            await setTimeoutPromise(2000);
        }
    } catch (error) {
        console.log(`start instance error! msg:${error}`);
        return false;
    }
}

/* 
 * socket轮询 传递instanc进度 
 * 获取所有状态为running的instance的id与进度
 * params { socket }
 */
exports.emitInstanceProgress = async (socket) => {
    let isRunning = true;
    while(isRunning) {
        const instance = await getInstance();
        // const progress = instance.map((item) => {
        //     return {
        //         id: item.id,
        //         progress: item.numTasks,
        //         status: item.status,
        //     }
        // })
        socket.emit('INSTANCE_PROG', instance);
        await setTimeoutPromise(3000);
    }
}

module.exports.getInstance = getInstance;
module.exports.getInstanceById = getInstanceById;
module.exports.createInstanceFromCmp = createInstanceFromCmp;
module.exports.createInstanceFromPara = createInstanceFromPara;
module.exports.updateInstanceOfCompare = updateInstanceOfCompare;
module.exports.updateInstnaceStatus = updateInstnaceStatus;