import { inject, injectable } from 'inversify';
import { PrismaClient, UserModel } from '@prisma/client';
import { TYPES } from '../types';
import { LoggerServiceInterface } from '../logger/types';

@injectable()
export class PrismaService {
  private client: PrismaClient;

  constructor(@inject(TYPES.LoggerService) private logger: LoggerServiceInterface) {
    this.client = new PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();
      this.logger.log('[PrismaService]: Successfully connected to Prisma database');
    } catch (error) {
      this.logger.error('[PrismaService]: Failed to connect to Prisma database', error);
    }
  }

  async disconnect() {
    return this.client.$disconnect();
  }
}
