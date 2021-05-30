import { Request, Response, NextFunction } from "express";

type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | any> | any;

export interface IUsersController {
  getUser: controllerType;

  createUser: controllerType;
}

export interface ISessionsController {
  createSession: controllerType;

  deleteSession: controllerType;

  getSession: controllerType;
}
