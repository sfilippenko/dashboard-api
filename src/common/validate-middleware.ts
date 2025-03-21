import { Middleware } from './types';
import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateError } from '../errors/validate-error';

export class ValidateMiddleware implements Middleware {
  constructor(
    private classToValidate: ClassConstructor<object>,
    private context: string,
  ) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const instance = plainToInstance(this.classToValidate, req.body);
    const errors = await validate(instance);
    if (errors.length) {
      next(new ValidateError(errors, this.context));
    } else {
      next();
    }
  }
}
