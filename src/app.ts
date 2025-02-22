import express, {Express} from "express";
import {LoggerService} from "./logger/logger-service.js";
import {Server} from 'http';
import {UsersController} from "./users/users-controller.js";
import {ExceptionFilterInterface} from "./errors/types.js";

export class App {
  app: Express;
  port: number;
  logger: LoggerService;
  server: Server;
  usersController: UsersController;
  exceptionFilters: ExceptionFilterInterface;

  constructor(logger: LoggerService, usersController: UsersController, exceptionFilters: ExceptionFilterInterface) {
    this.app = express();
    this.port = 8000;
    this.logger = logger
    this.usersController = usersController
    this.exceptionFilters = exceptionFilters
  }

  useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilters.catch.bind(this.exceptionFilters))
  }

  async init() {
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port, () => {
      this.logger.log(`Server started on port ${this.port}`);
    });
  }
}