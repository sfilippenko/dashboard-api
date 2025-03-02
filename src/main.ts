import {App} from "./app.js";
import {LoggerService} from "./logger/logger-service.js";
import {UsersController} from "./users/users-controller.js";
import {ExceptionFilter} from "./errors/exception-filters.js";
import {Container, ContainerModule} from "inversify";
import {LoggerServiceInterface} from "./logger/types.js";
import {TYPES} from "./types.js";
import {ExceptionFilterInterface} from "./errors/types.js";
import {UsersControllerInterface} from "./users/types.js";

const appBindings = new ContainerModule((bind) => {
  bind<LoggerServiceInterface>(TYPES.LoggerService).to(LoggerService)
  bind<ExceptionFilterInterface>(TYPES.ExceptionFilter).to(ExceptionFilter)
  bind<UsersControllerInterface>(TYPES.UsersController).to(UsersController)
  bind<App>(TYPES.App).to(App)
})

const main = async () => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.App);
  await app.init();
}

main();