import { Request, Response, NextFunction } from "express";

type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | any> | any;

export interface IChatController {
  postMsg: controllerType;
  getMsgs: controllerType;
}
