import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import type  JWTPayload  from '../types/JWTPayload.ts'


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const secret = process.env.JWT_SECRET as string;
    try{
      const decoded = jwt.verify(token, secret) as JWTPayload;
      req.user = decoded;
      console.log(decoded);
    }catch(e){
      console.log('Error at token verification');
      return res.status(403).json({ message: "Invalid token" });
      
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;