import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const insSchema = new Schema({
    task_id: {type: String, isRequired: true},
    content: {type: Schema.Types.Mixed, isRequired: true},
    status: {type: String, default: 'INIT'},
    create_time: {type: String, default: Date.parse( new Date())},
    finish_time: {type: String, default: ''},
    desc: {type: String, default: ''} 
})

const Instance = mongoose.model('Instance', insSchema, 'Instance');

export default Instance;