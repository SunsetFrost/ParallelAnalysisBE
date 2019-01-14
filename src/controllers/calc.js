import CalcModel from '../models/calc';

class Calc {
    async getCalcs(req, res, next) {
        const calcs = await CalcModel.find({});
        res.send({
            status: 200,
            data: calcs
        })
    }

    async getCalcById(req, res, next) {
        const _id = req.params.id;
        const calc = await CalcModel.findById({_id});
        res.send({
            status: 200,
            calc
        })
    }

    async addCalc(req, res, next) {
        const newCalc = req.body;
        const calc = await CalcModel.create(newCalc);
        res.send({
            status: 200,
            success: '创建数据集群成功',
            calc
        })
    }

    async updateCalc(req, res, next) {
        const newCalc = requ.body;
        const _id = newCalc.id;
        const calc = await CalcModel.findByIdAndUpdate({_id}, {$set: newCalc});
        res.send({
            status: 200,
            success: '更新数据集群成功',
            calc
        })
    }
}

export default new Calc();