import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const SECRET_KEY: Secret = 'DUMMY-SECRET';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
    if(process.env.NODE_ENV == "test"){
        next()
    } else {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
          throw new Error();
        }
     
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = decoded;
     
        next();
    }
  
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};