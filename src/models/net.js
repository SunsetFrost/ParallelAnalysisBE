import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const netSchema = new Schema({
    name: {type: String, isRequired: true},
    ip: {type: String, isRequired: true},
    type: {type: String, isRequired: true},//公网 局域网
    pcs: [{
        hostname: {type: String, isRequired: true},
        ip: {type: String, isRequired: true},
        cpu: Number,
        mem: Number,
        join_time: String
    }]
})

const Net = mongoose.model('Net', netSchema, 'Net');

export default Net;