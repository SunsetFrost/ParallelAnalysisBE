const _ = require('lodash');

const serverDB = require('../models/server.model').serverDB;

//获取server
async function getServer() {
    try {
        const result = await serverDB.find({
            //'status': 'ready'
        });
    
        return result;
    } catch (error) {
        console.log(error);
        return false;
    }
}

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

module.exports.getServer = getServer;
module.exports.updateServerState = updateServerState;
