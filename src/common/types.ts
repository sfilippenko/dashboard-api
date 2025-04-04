import { Router, Request, Response, NextFunction } from 'express';

export interface Middleware {
  execute: (req: Request, res: Response, next: NextFunction) => void;
}

export interface RouteController {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
  middlewares?: Middleware[];
}
