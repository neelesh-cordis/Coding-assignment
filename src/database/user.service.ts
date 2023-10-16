import { Optional } from "sequelize";
import User from "./user.model";
import bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
const SECRET_KEY = "DUMMY-SECRET"
export default class UserService{
    static async register(payload: any){
        const saltRounds = 8
        let { password } = payload
        password = await bcrypt.hash(password, saltRounds);
        return User.create({...payload,password})
    }

    static async login(payload: any){
        const { email } = payload
        const foundUser = await User.findOne({ 
            where : {
                email
            }
        });
        if(!foundUser){
            throw new Error('Email of user is not correct');
        }
        const isMatch = bcrypt.compareSync(payload.password, foundUser.dataValues.password);
        if (isMatch) {
            const token = jwt.sign({ id: foundUser.dataValues.id, name: foundUser.dataValues.name }, SECRET_KEY, {
                expiresIn: '2 days',
              });
         
              return { user: { id : foundUser.dataValues.id, name: foundUser.dataValues.name }, token: token };
        } else {
            throw new Error('Password is not correct');
        }
    }
}