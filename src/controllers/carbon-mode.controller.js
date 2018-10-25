const fetch = require('isomorphic-fetch');

const carbonModelDB = require('../models/carbon-model.model').carbonModelDB;
const InstanceCtrl = require('../controllers/instance.controller');

async function getCarbonModel(req, res, next) {
    try {
        const result = await carbonModelDB.find({});

        res.local.succeed = true;
        res.local.resData = result;
        return next();
    } catch(error) {

    }
}

async function invokeCarbonModelByParallel(req, res, next) {
    try {
        const modelName = req.modelName;
        InstanceCtrl.createInstance(req.task);
        
        
        
    } catch(error) {
         
    }
}

async function invokeCarbonModelBySingle(req, res, next) {
    try {
        const reqInstance = req.body.msInstance;
        const cmInstance = {
            type: 'compare'
        }

        InstanceCtrl.createInstance(cmInstance);
        InstanceCtrl.updateInstanceOfCompare("5bcff002473e4424ac000059", 'finish', 100);

        return res.json({
            code: 200
        })
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