const mongoose = require('mongoose');
const MongooseBase = require('./mongoose.model');

const data = {
    name: '',
    io: '',//input output
    instance: '',
    meta: {
        temporal: {
            value: -1,
            unit: '',
            start: '',
            end: '',
        },
        spatial: {
            lat: {
                resolution: 0.5,
                start: -1,
                end: -1,
            },
            lon: {
                resolution: 0.667,
                start: -1,
                end: -1,
            },
        },
    },
    content: {
        type: '',// file mongodb hdfs
        format: '', // site netcdf
        sites: [
            {
                name: '',
                lat: -1,
                lon: -1,
                path: ''
            }
        ],
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