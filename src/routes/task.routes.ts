import { Router } from "express";
import TaskController from "../controllers/task.controller";
import { auth } from "../middlewares/auth"

class TaskRoutes {
  router = Router();
  controller = new TaskController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Task
    this.router.post("/",auth, this.controller.createTask);

    // Retrieve all Tasks
    this.router.get("/",auth, this.controller.findAllTasks);

    // Retrieve a single Task with id
    this.router.get("/:id",auth, this.controller.findOneTask);

    // Update a Task with id
    this.router.put("/:id",auth, this.controller.updateTask);

    // Delete a Task with id
    this.router.delete("/:id",auth, this.controller.deleteTask);
  }
}

export default new TaskRoutes().router;
