import { BaseController } from '../common/base-controller';
import { LoggerServiceInterface } from '../logger/types';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { UsersControllerInterface, UsersServiceInterface } from './types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { ValidateMiddleware } from '../common/validate-middleware';
import { sign } from 'jsonwebtoken';
import { ConfigServiceInterface } from '../config/types';

@injectable()
export class UsersController extends BaseController implements UsersControllerInterface {
  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerServiceInterface,
    @inject(TYPES.UsersService) private usersService: UsersServiceInterface,
    @inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: 'post',
        path: '/login',
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto, 'register')],
      },
      {
        method: 'post',
        path: '/register',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto, 'register')],
      },
    ]);
  }

  async login(req: Request<unknown, unknown, UserLoginDto>, res: Response, next: NextFunction) {
    const isValid = await this.usersService.validateUser(req.body);
    if (!isValid) {
      return next(new HttpError(401, 'Auth error', 'login'));
    }
    const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
    this.ok(res, { jwt });
  }

  async register(req: Request<unknown, unknown, UserRegisterDto>, res: Response, next: NextFunction) {
    const user = await this.usersService.createUser(req.body);
    if (!user) {
      return next(new HttpError(422, 'User exist', 'register'));
    }
    this.ok(res, { email: user.email, id: user.id });
  }

  async signJWT(email: string, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (error, encoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(encoded || '');
          }
        },
      );
    });
  }
}
