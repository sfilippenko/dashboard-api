import { NextFunction, Request, Response, Router } from 'express';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user-entity';
import { UserLoginDto } from './dto/user-login.dto';

export interface UsersControllerInterface {
  router: Router;
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}

export interface UsersServiceInterface {
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
