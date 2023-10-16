import { Request, Response } from "express";
import UserService from "../database/user.service";

export default class UserController{
    async login(req: Request, res: Response){
        const { email } = req.body
        const user = await UserService.login(req.body)
        res.status(201).json({
            user
          });
    }

    async register(req: Request, res: Response){
        try{
            const user = await UserService.register(req.body)
            res.status(201).json({
                message:"SUCCESS",
                user: user.dataValues
            });
        }catch(err){
            console.log("error", err)
            res.status(500).json({
                message: "FAILURE",
                error: err
            });
        }
    }
}