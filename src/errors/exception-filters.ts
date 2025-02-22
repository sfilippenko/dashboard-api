import {NextFunction, Response, Request} from "express";
import {LoggerServiceInterface} from "../logger/types.js";
import {ExceptionFilterInterface} from "./types.js";
import {HttpError} from "./http-error.js";

export class ExceptionFilters implements ExceptionFilterInterface {
  constructor(private logger: LoggerServiceInterface) {

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