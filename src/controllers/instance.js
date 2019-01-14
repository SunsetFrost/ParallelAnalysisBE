import InstanceModel from '../models/instance';

class Instance {
    async getInstances() {
        const instances = await InstanceModel.find({});
        return instances;
    }

    async getInstanceById(id) {
        const instance = await InstanceModel.findById({id});
        return instance;
    }

    async addInstance(newIns) {
        const data = await InstanceModel.create(newIns);
        return data;
    }

    async updateInstance(id, newIns) {
        const data = await InstanceModel.findByIdAndUpdate(id, {$set: newIns});
        return data;
    }
}

export default new Instance();