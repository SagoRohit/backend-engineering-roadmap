import { TaskService } from "../services/TaskService";
import process from "node:process";

export class CommandHandler {
    constructor(private taskService: TaskService){}

    async run() {
        const args: string[] = process.argv.slice(2);
        const command: string = args[0];
        switch(command){
            case 'add': {
                const description: string = args[1];
                const task = await this.taskService.addTask(description);
                console.log(`Task added successfully (ID: ${task.id})`);
                break;
            }
            case 'update': {
                const id: string = args[1];
                const description: string = args[2];
                const task = await this.taskService.updateTask(id, description);
                if(task){
                    console.log(`Task Updated Successfully! (ID: ${task.id})`);
                }else
                    console.log(`Task no found!`);
                break;
            }
            case 'delete': {
                const id : string = args[1];
                const bool: boolean = await this.taskService.deleteTask(id);
                if(bool)
                    console.log("Task deleted successfully!");
                else
                    console.log("Task Not found!");
                break;
            }
            case 'list': {
                if(args[1]==undefined){
                    console.log(await this.taskService.getAllTask());
                }else{
                    if(args[1]==='done')
                        console.log(await this.taskService.getTaskByStatus('done'));
                    else if(args[1]==='in-progress')
                        console.log(await this.taskService.getTaskByStatus('in-progress'));
                    else if(args[1]==='todo')
                        console.log(await this.taskService.getTaskByStatus('todo'));
                    else
                        console.log("Invalid status!");
                }
                break;
            }
            case 'mark-in-progress': {
                const id: string = args[1];
                const task = await this.taskService.markInProgress(id);
                if(task)
                    console.log("Task Marked as in-progress!");
                else
                    console.log("Task not found!");
                break;
            }
            case 'mark-done': {
                const id: string = args[1];
                const task = await this.taskService.markDone(id);
                if(task)
                    console.log("Task Makred as done!");
                else
                    console.log("Task not found!");
                break;
            }
            default: {
                console.log("Invalid command!");
            }
        }
    }
}