import express, { Express } from 'express';
import { LoggerService } from './logger/logger-service';
import { Server } from 'http';
import { ExceptionFilterInterface } from './errors/types';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { UsersControllerInterface } from './users/types';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.LoggerService) private logger: LoggerService,
    @inject(TYPES.UsersController) private usersController: UsersControllerInterface,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilterInterface,
  ) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
    this.exceptionFilter = exceptionFilter;
  }

  useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server started on port ${this.port}`);
    });
  }
}
