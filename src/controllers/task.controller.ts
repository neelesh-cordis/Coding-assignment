import { Request, Response } from "express";
import Task from "../database/task.model";
import TaskService from "../database/task.service";

export default class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const {title, description, dueDate, assignedTo, category, status } = req.body
      const task = await TaskService.createTask({
        title, description, dueDate, assignedTo, category, status,
        creationDate : Date.now()
      })
      res.status(201).json({
        message: "SUCCESS",
        task: task.dataValues
      });
    } catch (err) {
      console.log("error", err)
      res.status(500).json({
        message: "FAILURE",
        error: err
      });
    }
  }

  async findAllTasks(req: Request, res: Response) {
    try {
      let where: {[k: string]: any} = {}
      if(!!req.query.assignedTo){
        where["assignedTo"] = req.query.assignedTo
      }
      if(!!req.query.category){
        where["category"] = req.query.category
      }
      const tasks = await Task.findAndCountAll({
        where
      })
      res.status(200).json({
        message: "SUCCESS",
        tasks
      });
    } catch (err) {
      res.status(500).json({
        message: "FAILURE",
        error: err
      });
    }
  }

  async findOneTask(req: Request, res: Response) {
    try {
      if(!req.params.id){
        throw new Error("Invalid Id");
      }
      const task = await Task.findByPk(req.params.id)
      res.status(200).json({
        message: "SUCCESS",
        task
      });
    } catch (err) {
      res.status(500).json({
        message: "FAILURE",
        error: err
      });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      if(!req.params.id){
        throw new Error("Invalid Id");
      }
      const {title, description, dueDate, assignedTo, category, status } = req.body
      const updatedTask = await Task.update({
        title, description, dueDate, assignedTo, category, status
      },{
        where:{
          id: req.params.id
        }
      })
      res.status(200).json({
        message: "SUCCESS",
        task : updatedTask
      });
    } catch (err) {
      res.status(500).json({
        message: "FAILURE",
        error: err
      });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      if(!req.params.id){
        throw new Error("Invalid Id");
      }
      const deleted = await Task.destroy({
        where:{
          id: req.params.id
        }
      })
      console.log("deleted", deleted)
      res.status(200).json({
        message: "SUCCESS"
      });
    } catch (err) {
      res.status(500).json({
        message: "FAILURE",
        error: err
      });
    }
  }

}
