import { BaseController } from '../common/base-controller';
import { LoggerServiceInterface } from '../logger/types';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { UsersControllerInterface, UsersServiceInterface } from './types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user-entity';
import { ValidateMiddleware } from '../common/validate-middleware';

@injectable()
export class UsersController extends BaseController implements UsersControllerInterface {
  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(TYPES.UsersService) private usersService: UsersServiceInterface,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: 'post',
        path: '/login',
        func: this.login,
      },
      {
        method: 'post',
        path: '/register',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto, 'register')],
      },
    ]);
  }

  login(req: Request<unknown, unknown, UserLoginDto>, res: Response, next: NextFunction) {
    console.log('login body', req.body);
    next(new HttpError(401, 'Auth error', 'login'));
  }

  async register(req: Request<unknown, unknown, UserRegisterDto>, res: Response, next: NextFunction) {
    const user = await this.usersService.createUser(req.body);
    if (!user) {
      return next(new HttpError(422, 'User exist', 'register'));
    }
    this.ok(res, { email: user.email, id: user.id });
  }
}
