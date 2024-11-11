import { Injectable } from '@nestjs/common';
import { createLogger, transports } from 'winston';
import * as process from 'node:process';
import * as WinstonDaily from 'winston-daily-rotate-file';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { LoggerConstant } from './logger.constant';
import { LoggerFormat } from './logger.format';
import { LogLevel } from './logger.types';
import { AppNodeEnv } from '../../types/app-node-env.type';

@Injectable()
export class LoggerSystem {
    private env = this.config.get<AppNodeEnv>('NODE_ENV', 'local');

    constructor(
        private config: ConfigService,
        private format: LoggerFormat,
    ) {}

    public logging(level: LogLevel, content: any, optionalParams: any[]) {
        let options = {};
        if (content instanceof Error) options = { ...options, error: content, context: content.name, stack: content.stack };
        optionalParams.forEach(param => {
            if (typeof param === 'string') {
                options = { ...options, context: param };
            } else if (param instanceof Error) {
                options = { ...options, error: param, context: param.name, stack: param.stack };
            } else {
                options = { ...options, ...param };
            }

            if (level === 'debug' && param instanceof Object) options = { ...options, debugObject: this.format.formatObject(param) };
        });

        this.core.log(level, content, options);
    }

    private getConsoleLevelByEnv() {
        switch (this.env) {
            case 'production':
                return 'http';
            case 'development':
                return 'debug';
            default:
                return 'query';
        }
    }

    /** Winston Transports File Item Default Options */
    private readonly defaultFileOptions = { dirname: path.join(process.cwd(), 'logs'), maxSize: '500m' };

    /** Winston Transports Console Item */
    private readonly console = new transports.Console({
        format: this.format.console,
        level: this.getConsoleLevelByEnv(),
    });

    /** Winston Transports File Item */
    private readonly dailyStdoutFile = new WinstonDaily({
        ...this.defaultFileOptions,
        format: this.format.console,
        level: this.getConsoleLevelByEnv(),
        filename: '%DATE%.console.log',
    });

    /** Winston Transports File Item */
    private readonly dailyErrorFile = new WinstonDaily({
        ...this.defaultFileOptions,
        format: this.format.error,
        level: 'error',
        filename: '%DATE%.error.log',
    }); //

    /** Winston Transports File Item */
    private readonly dailyHttpFile = new WinstonDaily({
        ...this.defaultFileOptions,
        format: this.format.http,
        level: 'http',
        filename: '%DATE%.http.log',
    });

    /** Winston   */
    public readonly core = createLogger({
        levels: LoggerConstant.LEVEL_VALUES,
        transports: [this.console, this.dailyStdoutFile, this.dailyErrorFile, this.dailyHttpFile],
    });
}
