import { Middleware } from './types';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements Middleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      verify(req.headers.authorization.split(' ')[1], this.secret, (error, decoded) => {
        if (decoded && typeof decoded === 'object') {
          req.user = decoded.email;
        }
        next();
      });
    } else {
      next();
    }
  }
}
