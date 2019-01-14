import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    type: {type: String, isRequired: true}, //net data calc
    action: {type: String, isRequired: true}, //create join
    content: {type: Schema.Types.Mixed, isRequired: true},
    name: String,
    status: {type: String, default: 'INIT'},
    instance_ids: {type: Array, default: []},
    create_time: String,
    finish_time: String,
    desc: String 
})

const Task = mongoose.model('Task', taskSchema, 'Task');

export default Task;