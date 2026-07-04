import { Task } from "../models/Task";

export class TaskRepository {
    private tasks: Task[];
    constructor(){
        this.tasks = [];
    }
    save(task: Task): Task{
        this.tasks.push(task);
        return task;
    }
    getAll(): ReadonlyArray<Task> {
        return this.tasks;
    }
    findById(id: string): Task | undefined{
        return this.tasks.find(Task => Task.id===id);
        
    }
    update(id: string, updates: Partial<Task>): Task | null {
        for(let i=0; i<this.tasks.length; i++) {
            if(this.tasks[i].id===id){
                this.tasks[i] = {...this.tasks[i], ...updates};
                return this.tasks[i];
            }
        }
        return null;
    }
    delete(id: string): boolean {
        let i; 
        for(i = 1; i<=this.tasks.length; i++){ 
            if(this.tasks[i].id === id) 
                break; 
            } 
        if(i==this.tasks.length) 
            return false; 
        else this.tasks.splice(i,1); 
            return true;
    }
}