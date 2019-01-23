import NetModel from "../models/net";

class Net {
    async getNetsByParam(param) {
        if (param.name) {
            const reg = new RegExp(param.name, "i");
            const nets = await NetModel.find({ name: { $regex: reg } });
            return nets;
        }
        const nets = await NetModel.find(param);
        return nets;
    }

    async addNet(newNet) {
        try {
            const data = await NetModel.create(newNet);
            return data;
        } catch (error) {
            throw new Error(
                JSON.stringify({
                    status: 404,
                    message: "创建网络失败"
                })
            );
        }
    }

    async getNetById(id) {
        try {
            const net = await NetModel.findById(id);
            if (!net) {
                throw new Error("没有该网络");
            }
            return net;
        } catch (error) {
            const err = {
                status: 404,
                message: error.message
            };
            throw new Error(JSON.stringify(err));
        }
    }

    async updateNet(newNet) {
        const data = await NetModel.findOneAndUpdate(
            { _id: newNet._id },
            { $set: newNet }
        );
        return data;
    }

    async getPcById(net_id, pc_hostname) {
        const net = await this.getNetById(net_id);
        const [pc] = net.pcs.filter(item =>
            item.hostname === pc_hostname ? true : false
        );
        return pc;
    }

    async addPc(id, newPC) {
        await NetModel.findByIdAndUpdate(id, {
            $addToSet: { pcs: newPC }
        });
        const data = await this.getPcById(id, newPC.hostname);
        return data;
    }

    async updatePc(netId, pcId, PC) {
        const data = await NetModel.updateOne(
            { _id: netId, pcs: { _id: pcId } },
            { $set: { "pcs.$": PC } }
        );
        return data;
    }
}

export default new Net();
