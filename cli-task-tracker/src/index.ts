#!/usr/bin/env node
import { CommandHandler } from "./commands/CommandHandler";
import { TaskRepository } from "./repositories/TaskRepository";
import { TaskService } from "./services/TaskService";

// console.log("Index start here...");
// const taskrepo = new TaskRepository;
// const taskService = new TaskService(taskrepo);
// taskService.addTask("buy-grocery");
// taskService.addTask("have meal");
// console.log("Before mark done.....");
// console.log(taskService.getAllTask());
// console.log('After mark done......');
// taskService.markDone("2");
// console.log(taskService.getAllTask());
// console.log("now update.....");
// taskService.updateTask('1', "buy-grocery and cook meal");
// console.log(taskService.getAllTask());
async function main() {
    const cmd = new CommandHandler(
        new TaskService(
            new TaskRepository
    ));
    await cmd.run();
}
main();