import { App } from './app';
import { LoggerService } from './logger/logger-service';
import { UsersController } from './users/users-controller';
import { ExceptionFilter } from './errors/exception-filters';
import { Container, ContainerModule } from 'inversify';
import { LoggerServiceInterface } from './logger/types';
import { TYPES } from './types';
import { ExceptionFilterInterface } from './errors/types';
import { UsersControllerInterface } from './users/types';

const appBindings = new ContainerModule((bind) => {
  bind<LoggerServiceInterface>(TYPES.LoggerService).to(LoggerService);
  bind<ExceptionFilterInterface>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<UsersControllerInterface>(TYPES.UsersController).to(UsersController);
  bind<App>(TYPES.App).to(App);
});

const main = async () => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.App);
  await app.init();
};

main();
