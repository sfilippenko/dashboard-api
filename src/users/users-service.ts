import { UsersServiceInterface } from './types';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user-entity';
import { UserLoginDto } from './dto/user-login.dto';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements UsersServiceInterface {
  async createUser(dto: UserRegisterDto) {
    const user = new User(dto.email, dto.name);
    await user.setPassword(dto.password);
    return null;
  }

  async validateUser(dto: UserLoginDto) {
    return true;
  }
}
