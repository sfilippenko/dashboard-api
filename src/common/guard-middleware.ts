import { Middleware } from './types';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error';

export class GuardMiddleware implements Middleware {
  async execute(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      next();
    } else {
      next(new HttpError(401, 'Unauthorized', 'GuardMiddleware'));
    }
  }
}
