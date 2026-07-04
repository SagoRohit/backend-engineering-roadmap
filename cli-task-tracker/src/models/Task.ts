import { TaskStatus } from "../types/TaskTypes";

export interface Task {
    id: string,
    description: string,
    status: TaskStatus,
    createdAt: Date,
    updatedAt: Date
}