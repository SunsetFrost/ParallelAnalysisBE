const mongoose = require('mongoose');
const MongooseBase = require('./mongoose.model');

const data = {
    name: '',
    io: '',//input output
    instance: '',
    meta: {
        temporal: '',
        spatial: '',
    },
    content: {
        type: '',// file mongodb hdfs
        format: '', // site netcdf
        sites: [],
    },
    desc: '',
};

class DataDB extends MongooseBase{
    constructor() {
        const collName = 'Data';
        const schema = {
            name: String,
            io: String,
            instance: String,
            meta: mongoose.Schema.Types.Mixed,
            content: mongoose.Schema.Types.Mixed,
            desc: String
        }

        super(collName, schema);
    }
}

const dataDB = new DataDB();
module.exports.dataDB = dataDB;