import {Logger} from "tslog";
import {LoggerServiceInterface} from "./types.js";
import {injectable} from "inversify";

@injectable()
export class LoggerService implements LoggerServiceInterface {
  private logger

  constructor() {
    this.logger = new Logger();
  }

  log(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}