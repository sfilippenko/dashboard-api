import { UsersRepositoryInterface } from './types';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma-service';
import { User } from './user-entity';

@injectable()
export class UsersRepository implements UsersRepositoryInterface {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async create(user: User) {
    return this.prismaService.client.userModel.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    });
  }

  async find(email: string) {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
