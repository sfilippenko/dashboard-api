import { NextFunction, Response, Request } from 'express';
import { LoggerServiceInterface } from '../logger/types';
import { ExceptionFilterInterface } from './types';
import { HttpError } from './http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(TYPES.LoggerService) private logger: LoggerServiceInterface) {}

  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpError) {
      console.log(1);
      this.logger.error(`[${error.context}] Error ${error.statusCode}: ${error.message}`);
      res.status(error.statusCode).send({ error: error.message });
    } else {
      console.log(2);
      this.logger.error(error);
      res.status(500).send({ error: error.message });
    }
  }
}
