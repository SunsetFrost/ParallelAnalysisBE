const _ = require('lodash');

const serverDB = require('../models/server.model');

//更新server状态
async function updateServerState(serverId, newStatus) {
    try {
        const strWhere = {
            _id: serverId
        }
        const strUpdate = {
            $set: {
                status: newStatus
            }
        }
        const dbResult = await serverDB.update(strWhere, strUpdate);
    } catch(err) {

    }
} 

module.exports.updateServerState = updateServerState;
