import { UsersRepositoryInterface, UsersServiceInterface } from './types';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user-entity';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ConfigServiceInterface } from '../config/types';

@injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigServiceInterface,
    @inject(TYPES.UsersRepository) private usersRepository: UsersRepositoryInterface,
  ) {}
  async createUser(dto: UserRegisterDto) {
    const salt = this.configService.get('salt');
    const user = new User(dto.email, dto.name);
    await user.setPassword(dto.password, Number(salt));

    if (await this.usersRepository.find(user.email)) {
      return null;
    }

    return this.usersRepository.create(user);
  }

  async validateUser(dto: UserLoginDto) {
    const existedUser = await this.usersRepository.find(dto.email);
    if (!existedUser) {
      return false;
    }
    const user = new User(existedUser.email, existedUser.name, existedUser.password);
    return user.comparePasswords(dto.password);
  }

  async getUser(email: string) {
    return this.usersRepository.find(email);
  }
}
