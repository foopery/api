import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerSystem } from './logger.system';
import { LoggerFormat } from './logger.format';

@Global()
@Module({
    providers: [LoggerService, LoggerSystem, LoggerFormat],
    exports: [LoggerService],
})
export class LoggerModule {}
