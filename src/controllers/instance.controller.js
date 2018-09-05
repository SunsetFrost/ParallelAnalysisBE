const fetch = require('isomorphic-fetch');

const instanceDB = require('../models/instance.model').instanceDB;

async function getInstance(req, res, next) {
    try {
        const result = await instanceDB.find({});

        res.locals.succeed = true;
        res.locals.resData = result;
        return next();
    } catch(error) {

    }
}

const mockInstance = () => {
    return [
        {
            id: '01',
            taskNum: 1000,
            taskCurrent: parseInt(Math.random() * 1000)
        },
        {
            id: '02',
            taskNum: 1000,
            taskCurrent: parseInt(Math.random() * 1000)
        }
    ]
}

async function getTask(frameworkId, tasks) {
    //获取task状态  stageing running failed

    //若为running  则进一步获取task详细spark staging

    let result = [];
    for(const task of tasks) {
        const url = `http://${task.ip}:4040/api/v1/applications/${frameworkId}/stages`;
        try {
            const responsePromise = await fetch(url);
            const data = await responsePromise.json();

            const newData = {
                id: task.id,
                stages: data,
            }
            result.push(newData);
        } catch(error) {
            return {
                status: 'error',
                info: error,
            }
        }
        
    }
    return result;
}

module.exports.getInstance = getInstance;
module.exports.getTask = getTask;
module.exports.mockInstance = mockInstance;