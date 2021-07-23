import { Request, Response, NextFunction } from "express";

type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | any> | any;

export interface IUsersController {
  [k: string]: controllerType;
}

export interface ISessionsController {
  [k: string]: controllerType;
}
