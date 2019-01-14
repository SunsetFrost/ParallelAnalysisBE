import NetModel from '../models/net'

class Net {
    async getNets() {
        const nets = await NetModel.find({});
        return nets;
    }

    async getNetById(id) {
        const net = await NetModel.findById({_id: id});
        return net;
    }

    async addNet(newNet) {
        const data = await NetModel.create(newNet);
        return data;
    }

    async updateNet(id, newNet) {
        const data = await NetModel.findOneAndUpdate({_id: id}, {$set: newNet});
        return data;
    }
}

export default new Net();