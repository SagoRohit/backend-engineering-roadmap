import { Task } from "../models/Task";
import { TaskRepository } from "../repositories/TaskRepository";
import { TaskStatus } from "../types/TaskTypes";

export class TaskService {
    constructor(private taskRepo: TaskRepository) {}
    async addTask(description : string): Promise<Task> {
        if(!description.trim())
            throw new Error("Description can not be empty!");
        const tasks = await this.taskRepo.getAll();
        let nextId: number =0;
        for(let task of tasks){
            nextId = Math.max(Number(task.id), nextId);
        }
        const now = new Date();
        const task: Task = {
            id: String(nextId+1),
            description: description,
            status: 'todo',
            createdAt: now,
            updatedAt: now
        }
        return this.taskRepo.save(task);
    }
    async getAllTask(): Promise<ReadonlyArray<Task>> {
        return this.taskRepo.getAll();
    }
    async getTaskById(id: string) {
        return this.taskRepo.findById(id);
    }
    async updateTask(id: string, description: string): Promise<Task | null>{
        if(!description.trim())
            throw new Error("Description can not be empty!");
        return this.taskRepo.update(id, {description, updatedAt: new Date()});
    }
    async markInProgress(id: string): Promise<Task | null>{
        return this.taskRepo.update(id, {status: 'in-progress', updatedAt: new Date()});
    }
    async markDone(id: string): Promise<Task | null>{
        return this.taskRepo.update(id, {status: 'done', updatedAt: new Date()});
    }
    async deleteTask(id: string): Promise<boolean>{
        return this.taskRepo.delete(id);
    }
    async getTaskByStatus(status: TaskStatus): Promise<Task[]>{
        const tasks = this.taskRepo.getAll();
        return (await tasks).filter(task => task.status===status);
    }
}