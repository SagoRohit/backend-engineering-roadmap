import { Task } from "../models/Task";
import { promises as fs } from "node:fs";
import process from "node:process";
import path from "node:path";


export class TaskRepository {
    private FILE_PATH = path.join(process.cwd(), "src/data", "tasks.json");
    private async readTasks(): Promise<Task[]> {
        try{
            const rawData = await fs.readFile(this.FILE_PATH, 'utf-8');
            const parseData: Task[] = JSON.parse(rawData);
            for(let task of parseData){
                task.createdAt = new Date(task.createdAt);
                task.updatedAt = new Date(task.updatedAt);
            }
            return parseData;
        }catch(error: any) {
            if(error.code === 'ENOENT'){
                await fs.mkdir(path.dirname(this.FILE_PATH), {
                    recursive: true
                });
                await fs.writeFile(this.FILE_PATH, JSON.stringify([]));
                return [];
            }
            throw new Error(`Failed to read tasks: ${error.message}`);
        }
    }
    private async writeTasks(tasks: Task[]): Promise<void> {   
        try{
            await fs.writeFile(this.FILE_PATH, JSON.stringify(tasks, null, 2),'utf-8');
        } catch {
            throw new Error("tasks writing fails!");
        }
    }
    async save(task: Task): Promise<Task>{
        const tasks: Task[] = await this.readTasks();
        tasks.push(task);
        await this.writeTasks(tasks);
        return task;
    }
    async getAll(): Promise<ReadonlyArray<Task>> {
        const tasks: Task[] = await this.readTasks();
        return tasks;
    }
    async findById(id: string): Promise<Task | undefined>{
        const tasks: Task[] = await this.readTasks();
        return tasks.find(task => task.id===id);
    }
    async update(id: string, updates: Partial<Task>): Promise<Task | null> {
        const tasks: Task[] = await this.readTasks();
        for(let i=0; i<tasks.length; i++) {
            if(tasks[i].id===id){
                tasks[i] = {...tasks[i], ...updates};
                await this.writeTasks(tasks);
                return tasks[i];
            }
        }
        return null;
    }
    async delete(id: string): Promise<boolean> {
        const tasks: Task[] = await this.readTasks();
        let i; 
        for(i = 0; i<tasks.length; i++){ 
            if(tasks[i].id === id) 
                break; 
            } 
        if(i==tasks.length){
            return false; 
        } 
        else{
            tasks.splice(i,1); 
            await this.writeTasks(tasks);
            return true;
        } 
    }
}