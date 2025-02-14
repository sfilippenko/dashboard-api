import express, {Express} from "express";
import {LoggerService} from "./logger/logger-service.js";

export class App {
  app: Express;
  port: number;
  logger: LoggerService;

  constructor(options: {logger: LoggerService}) {
    this.app = express();
    this.port = 8000;
    this.logger = options.logger
  }

  async init() {
    this.app.listen(this.port, () => {
      this.logger.log('server started');
    });
  }
}