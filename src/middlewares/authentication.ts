import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import { IUser } from '../utils/types';

declare module "express" {
  interface Request {
    user?: any;
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  // console.log(req)
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.SECRET!, (err, decode) => {
      if (err) {
        res.status(403).send({ success: false, message: "Invalid Token" });
      } else {
        req.user = decode;
        console.log(124567890);
        console.log(req.user);
        next();
      }
    });
  } else {
    res.status(403).send({ success: false, message: "No Token" });
  }
};



export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};


