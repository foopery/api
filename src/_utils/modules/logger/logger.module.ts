import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerSystem } from './logger.system';
import { LoggerFormat } from './logger.format';
import * as Joi from 'joi';
import { EnvModule } from '../env/env.module';

@Global()
@Module({
    imports: [
        EnvModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production', 'local', 'test').required(),
                TZ: Joi.string().required(),
            }),
        }),
    ],
    providers: [LoggerService, LoggerSystem, LoggerFormat],
    exports: [LoggerService],
})
export class LoggerModule {}
