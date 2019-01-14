import TaskModel from '../models/task';
import Instance from './instance';

class Task {
    async getTasks() {
        const tasks = await TaskModel.find({});
        return tasks;
    }

    async getTaskById(id) {
        const task = await TaskModel.findById({_id: id});
        return task;
    }

    async addTask(newTask) {
        const data = await TaskModel.create(newTask);
        return data;
    }

    async updateTask(id, newTask) {
        const data = TaskModel.findByIdAndUpdate(id, {$set: newTask});
        return data;
    }

    async startTaskById(id) {
        const task = await this.getTaskById(id);
        if(task.type == 'net' && task.action == 'create') {
            const ins = Instance.addInstance({
                task_id: task._id,
                content: task.content,
            });
            return ins;
        }
    }
}

export default new Task();