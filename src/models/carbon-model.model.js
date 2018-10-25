const MongooseBase = require('./mongoose.model');

const CarbonModel = {
    _id: '',
    name: '',
}

class CarbonModelDB extends MongooseBase {
    constructor() {
        const collName = 'CarbonModel';
        const schema = {
            _id: String,
            name: String
        }

        super(collName, schema);
    }
}

const carbonModelDB = new CarbonModelDB();
module.exports.carbonModelDB = carbonModelDB;