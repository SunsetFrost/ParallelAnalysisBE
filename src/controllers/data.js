import DataModel from '../models/data';

class Data {
    async getDatas(req, res, next) {
        const datas = await DataModel.find({});
        res.send({
            status: 200,
            data: datas
        })
    }

    async getDataById(req, res, next) {
        const _id = req.params.id;
        const data = await DataModel.findById({_id});
        res.send({
            status: 200,
            data
        })
    }

    async addData(req, res, next) {
        const newData = req.body;
        const data = await DataModel.create(newData);
        res.send({
            status: 200,
            success: '创建数据集群成功',
            data
        })
    }

    async updateData(req, res, next) {
        const newData = requ.body;
        const _id = newData.id;
        const data = await DataModel.findByIdAndUpdate({_id}, {$set: newData});
        res.send({
            status: 200,
            success: '更新数据集群成功',
            data
        })
    }
}

export default new Data();