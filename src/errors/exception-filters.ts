import {NextFunction, Response, Request} from "express";
import {LoggerServiceInterface} from "../logger/types.js";
import {ExceptionFilterInterface} from "./types.js";
import {HttpError} from "./http-error.js";
import {inject, injectable} from "inversify";
import {TYPES} from "../types.js";

@injectable()
export class ExceptionFilter implements ExceptionFilterInterface {
  constructor(@inject(TYPES.LoggerService) private logger: LoggerServiceInterface) {

  }

  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpError) {
      this.logger.error(`[${error.context}] Error ${error.statusCode}: ${error.message}`);
      res.status(error.statusCode).send({error: error.message});
    } else {
      this.logger.error(error);
      res.status(500).send({error: error.message});
    }
  }
}