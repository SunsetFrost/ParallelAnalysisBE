const fetch = require('isomorphic-fetch');

const carbonModelDB = require('../models/carbon-model.model').carbonModelDB;
const InstanceCtrl = require('../controllers/instance.controller');

async function getCarbonModel() {
    try {
        const result = await carbonModelDB.find();
        return result;
    } catch(error) {
        console.log(error);
    }
}

async function invokeCarbonModelByParallel() {
    try {
        InstanceCtrl.createInstance(req.task);
        
        
        
    } catch(error) {
         
    }
}

async function invokeCarbonModelBySingle(reqInstance) {
    try {
        const cmInstance = {
            type: 'compare'
        }

        InstanceCtrl.createInstance(cmInstance);
        InstanceCtrl.updateInstanceOfCompare("5bcff002473e4424ac000059", 'finish', 100);


    } catch(error) {
        console.log(error);
        return false;
    }
}

function invokeByCmd(modelName) {
    const instanceId = 'todo';
    return instanceId;
}

module.exports.getCarbonModel = getCarbonModel;
module.exports.invokeCarbonModelByParallel = invokeCarbonModelByParallel;
module.exports.invokeCarbonModelBySingle = invokeCarbonModelBySingle;