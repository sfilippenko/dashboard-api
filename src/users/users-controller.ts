import {BaseController} from "../common/base-controller.js";
import {LoggerServiceInterface} from "../logger/types.js";
import {Request, Response, NextFunction} from "express";
import {HttpError} from "../errors/http-error.js";

export class UsersController extends BaseController {
  constructor(logger: LoggerServiceInterface) {
    super(logger);
    this.bindRoutes([
      {
        method: 'post',
        path: '/login',
        func: this.login,
      },
      {
        method: 'post',
        path: '/register',
        func: this.register,
      },
    ])
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, 'Auth error', 'login'));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register')
  }
}