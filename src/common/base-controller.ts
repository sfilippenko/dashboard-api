import { Router, Response } from 'express';
import { LoggerServiceInterface } from '../logger/types';
import { RouteController } from './types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(@inject(TYPES.LoggerService) private logger: LoggerServiceInterface) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  send<T>(res: Response, code: number, message: T) {
    return res.type('application/json').status(code).json(message);
  }

  ok<T>(res: Response, message: T) {
    return this.send(res, 200, message);
  }

  created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: RouteController[]) {
    routes.forEach((route) => {
      this.logger.log(`[${route.method}]: ${route.path}`);
      const middlewareHandlers = (route.middlewares || []).map((middleware) => middleware.execute.bind(middleware));
      const handler = route.func.bind(this);
      this.router[route.method](route.path, [...middlewareHandlers, handler]);
    });
  }
}
