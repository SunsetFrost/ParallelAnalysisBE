import NetModel from '../models/net'

class Net {
    async getNets(req, res, next) {
        const nets = await NetModel.find({});
        res.send({
            status: 200,
            data: nets
        })
    }

    async getNetById(req, res, next) {
        const _id = req.params.id;
        const net = await NetModel.findById({_id});
        res.send({
            status: 200,
            data: net
        })
    }

    async addNet(req, res, next) {
        const newNet = req.body;
        const data = await NetModel.create(newNet);
        res.send({
            status: 200,
            success: '创建网络成功',
            data: newNet
         })
    }

    async updateNet(req, res, next) {
        const newNet = req.body;
        const _id = newNet.id;
        await NetModel.findOneAndUpdate({_id}, {$set: newNet});
        res.send({
            status: 200,
            success: '更新网络成功',
            data: newNet
        })
    }
}

export default new Net()