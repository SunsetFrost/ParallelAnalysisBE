const fetch = require('isomorphic-fetch');

const instanceDB = require('../models/instance.model').instanceDB;
//const compareDB = require('../models/compare_instance.model');

async function getInstance() {
    try {
        const result = await instanceDB.find({});

        return result;
    } catch(error) {
        console.log(error);
    }
}

async function createInstance(cmodelInstance) {
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

async function updateInstanceOfCompare(taskId, state, progress) {
    // try {
    //     compareDB.update({
    //         _id: taskId
    //     }, {
    //         'state': state,
    //         'progress': progress
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
}

module.exports.getInstance = getInstance;
module.exports.createInstance = createInstance;
module.exports.updateInstanceOfCompare = updateInstanceOfCompare;