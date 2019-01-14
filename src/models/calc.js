import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const calcSchema = new Schema({
    name: {type: String, isRequired: true},
    net_id: {type: Number, isRequired: true},
    ip: {type: String, isRequired: true},
    port: {type: Number, isRequired: true},
    inputdata_id: {type: Number, isRequired: true},
    outputdata_id: {type: Number, isRequired: true},
    dockers: [{
        hostname: {type: String, isRequired: true},
        ip: {type: String, isRequired: true},
        type: {type: String, isRequired: true}, //master slave
        cpu: Number,
        mem: Number,
        create_time: String,
    }]
})

const Calc = mongoose.model('Calc', calcSchema, 'Calc');

export default Calc;