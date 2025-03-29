import { App } from './app';
import { LoggerService } from './logger/logger-service';
import { UsersController } from './users/users-controller';
import { ExceptionFilter } from './errors/exception-filters';
import { Container, ContainerModule } from 'inversify';
import { LoggerServiceInterface } from './logger/types';
import { TYPES } from './types';
import { ExceptionFilterInterface } from './errors/types';
import { UsersControllerInterface, UsersRepositoryInterface, UsersServiceInterface } from './users/types';
import { UsersService } from './users/users-service';
import { ConfigService } from './config/config-service';
import { ConfigServiceInterface } from './config/types';
import { PrismaService } from './database/prisma-service';
import { UsersRepository } from './users/users-repository';

const appBindings = new ContainerModule((bind) => {
  bind<LoggerServiceInterface>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
  bind<ExceptionFilterInterface>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
  bind<UsersControllerInterface>(TYPES.UsersController).to(UsersController).inSingletonScope();
  bind<App>(TYPES.App).to(App).inSingletonScope();
  bind<UsersServiceInterface>(TYPES.UsersService).to(UsersService).inSingletonScope();
  bind<ConfigServiceInterface>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
  bind<UsersRepositoryInterface>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
});

const main = async () => {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.App);
  await app.init();
};

main();
