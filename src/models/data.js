import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const dataSchema = new Schema({
	name: {type: String, isRequired: true},
    net_id: {type: Number, isRequired: true},
    ip: {type: String, isRequired: true},
    port: {type: Number, isRequired: true},
    modeldata_ids: {type: Array, default: []},
    dockers: [{
        hostname: {type: String, isRequired: true},
        ip: {type: String, isRequired: true},
        type: {type: String, isRequired: true}, //master slave
        cpu: Number,
        mem: Number,
        create_time: String,
    }]
})

const Data = mongoose.model('Data', dataSchema, 'Data');

export default Data;