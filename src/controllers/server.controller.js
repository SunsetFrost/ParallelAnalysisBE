const _ = require('lodash');

const serverDB = require('../models/server.model').serverDB;

//获取server
async function getServer(req, res, next) {
    try {
        const result = await serverDB.find({
            'status': 'ready'
        });
    
        res.locals.succeed = true;
        res.locals.resData = result;
        return next();
    } catch (error) {
        const abc = '';
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
