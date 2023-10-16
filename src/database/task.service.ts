import { Optional } from "sequelize";
import Task from "./task.model";
export default class TaskService{
    static createTask(payload: Optional<any, string> | undefined){
        return Task.create(payload)
    }
}