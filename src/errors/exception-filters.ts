import { NextFunction, Response, Request } from 'express';
import { LoggerServiceInterface } from '../logger/types';
import { ExceptionFilterInterface } from './types';
import { HttpError } from './http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ValidateError } from './validate-error';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(TYPES.LoggerService) private logger: LoggerServiceInterface) {}

  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpError) {
      this.logger.error(`[${error.context}] Error ${error.statusCode}: ${error.message}`);
      res.status(error.statusCode).send({ errorMessage: error.message });
    } else if (error instanceof ValidateError) {
      this.logger.error(`[${error.context}] ${error.message}`);
      res.status(422).send({ errorMessage: error.message, errors: error.errors });
    } else {
      this.logger.error(error);
      res.status(500).send({ errorMessage: error.message });
    }
  }
}
