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
        for(let i = Number(siteStart); i <= Number(siteEnd); i++) {
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
        server: [],
        numTasks: {
            total: -1,
            active: -1,
            completed: -1,
            failed: -1 
        },
        time: {
             create: task.createTime,
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

        //mock submit intance to spark 
        await setTimeoutPromise(4000); //判端spark状态 并获取成功后的任务分配信息
        const numTasks = {
            total: ins.modelCfg.sites.length,
            active: 0,
            completed: 0,
            failed: 0
        };

        const server = [
            {
                id: '1',
                name: 'OGMS_ubuntu_slave1',
                hostport: '172.21.212.122',
                resource: {
                    cpu: (2 + (Math.random() * 0.5)).toFixed(1),
                    memory: '345Mb',
                    disk: '',
                    maxMemory: ''
                },
                task: {
                    total: Math.round(numTasks.total * 0.5),
                    active: 1,
                    complete: 0,
                    failed: 0
                }
            },
            {
                id: '2',
                name: 'OGMS_ubuntu_slave2',
                hostport: '172.21.213.117',
                resource: {
                    cpu: (1 + (Math.random() * 0.5)).toFixed(1),
                    memory: '345Mb',
                    disk: '',
                    maxMemory: ''
                },
                task: {
                    total: Math.round(numTasks.total * 0.2),
                    active: 1,
                    complete: 0,
                    failed: 0
                }
            },
            {
                id: '3',
                name: 'OGMS_ubuntu_slave3',
                hostport: '172.21.212.246',
                resource: {
                    cpu: (1 + (Math.random() * 0.5)).toFixed(1),
                    memory: '345Mb',
                    disk: '',
                    maxMemory: ''
                },
                task: {
                    total: Math.round(numTasks.total * 0.3),
                    active: 1,
                    complete: 0,
                    failed: 0
                }
            },
        ];

        //update db
        const where = {
            _id: ObjectID(ins._id)
        }
        const update = {
            $set: {
                time: {
                    ...ins.time,
                    start: Date.now()
                },
                numTasks: numTasks,
                server: server,
                status: 'RUNNING'
            }
        }
        const msg = await instanceDB.update(where, update);

        // polling spark running progress
        await updateInstanceProgress(insId);

    } catch (error) {
        console.log(`start instance error! msg:${error}`);
        return false;
    }
}

async function updateInstanceProgress(insId) {
    let isFinished = false; 
    while(!isFinished) {
        const ins = await getInstanceById(insId);
        let totalCpu = 0;
        for(item of ins.server) {
            totalCpu += Number(item.resource.cpu);
        }

        if(ins.numTasks.completed >= 0 && ins.numTasks.completed < ins.numTasks.total) {
            //update db
            const where = {
                _id: ObjectID(ins._id)
            }
            const newServer = ins.server.map( item => {
                return {
                    ...item,
                    task: {
                        ...item.task,
                        completed: SparkCtrl.mockSpark(ins.time.start, Date.now(), item.task.total, item.resource.cpu),
                    }
                }
            })
            const update = {
                $set: {
                    'numTasks.completed': SparkCtrl.mockSpark(ins.time.start, Date.now(), ins.numTasks.total, totalCpu),
                    server: newServer,
                }
            }
            const msg = await instanceDB.update(where, update);
        }
        if(ins.numTasks.completed >= ins.numTasks.total) {
            //update db
            const where = {
                _id: ObjectID(ins._id)
            }
            const newServer = ins.server.map(item => {
                return {
                    ...item,
                    task: {
                        ...item.task,
                        completed: item.task.total,
                    }     
                }
            })
            const update = {
                $set: {
                    'numTasks.completed': ins.numTasks.total,
                    server: newServer,
                    status: 'FINISHED_SUCCEED',
                    'time.end': Date.now()
                }
            } 
            const msg = await instanceDB.update(where, update);
            isFinished = true; 
        }

        await setTimeoutPromise(2000);
    }
}

/* 
 * socket轮询 传递instanc进度 
 * 获取所有状态为running的instance的id与进度
 * params { socket }
 */
exports.emitInstance = async (socket) => {
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