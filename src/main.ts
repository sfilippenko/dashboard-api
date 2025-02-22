import {App} from "./app.js";
import {LoggerService} from "./logger/logger-service.js";
import {UsersController} from "./users/users-controller.js";
import {ExceptionFilters} from "./errors/exception-filters.js";

const main = async () => {
  const logger = new LoggerService();
  const app = new App(
    logger,
    new UsersController(logger),
    new ExceptionFilters(logger),
  );
  await app.init();
}

main();