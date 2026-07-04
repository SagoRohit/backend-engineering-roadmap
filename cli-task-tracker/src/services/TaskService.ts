import { Task } from "../models/Task";
import { TaskRepository } from "../repositories/TaskRepository";

export class TaskService {
    private count: number;
    constructor(private taskRepo: TaskRepository) {
        this.count = 1;
    }
    addTask(description : string): Task {
        if(!description.trim())
            throw new Error("Description can not be empty!");
        const now = new Date();
        const task: Task = {
            id: String(this.count),
            description: description,
            status: 'todo',
            createdAt: now,
            updatedAt: now
        }
        this.count++;
        return this.taskRepo.save(task);
    }
    getAllTask(): ReadonlyArray<Task> {
        return this.taskRepo.getAll();
    }
    getTaskById(id: string) {
        return this.taskRepo.findById(id);
    }
    updateTask(id: string, description: string): Task | null{
        if(!description.trim())
            throw new Error("Description can not be empty!");
        return this.taskRepo.update(id, {description, updatedAt: new Date()});
    }
    markInProgress(id: string): Task | null{
        return this.taskRepo.update(id, {status: 'in-progress', updatedAt: new Date()});
    }
    markDone(id: string): Task | null{
        return this.taskRepo.update(id, {status: 'done', updatedAt: new Date()});
    }
    deleteTask(id: string): boolean{
        return this.taskRepo.delete(id);
    }
}