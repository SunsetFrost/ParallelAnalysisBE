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

/* 
 * 比较平台计算任务 
 * 调用并行计算
 */
async function invokeCarbonModelBySingle(reqInstance) {
    try {
        const cmInstance = {
            type: 'compare'
        }
        /* 
          本地创建新实例
          
          更新本地实例状态
          更新比较平台数据库的实例状态
        */
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
module.exports.invokeCarbonModelBySingle = invokeCarbonModelBySingle;