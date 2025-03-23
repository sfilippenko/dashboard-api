import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { LoggerServiceInterface } from '../logger/types';
import { config, DotenvParseOutput } from '@dotenvx/dotenvx';
import { ConfigServiceInterface } from './types';

@injectable()
export class ConfigService implements ConfigServiceInterface {
  private configResult: DotenvParseOutput = {};

  constructor(@inject(TYPES.LoggerService) private logger: LoggerServiceInterface) {
    const result = config(process.env.ENV_CONFIG_PATH ? { path: process.env.ENV_CONFIG_PATH } : undefined);
    if (result.error) {
      logger.error('[ConfigService] config parsing error', result.error.message);
    } else if (!result.parsed) {
      logger.error('[ConfigService] config no parsing result');
    } else {
      logger.log('[ConfigService] config parsed', result.parsed);
      this.configResult = result.parsed;
    }
  }

  get(key: string) {
    if (!this.configResult) {
      this.logger.error(`[ConfigService] no config to get key [${key}]`);
    }
    return this.configResult[key];
  }
}
