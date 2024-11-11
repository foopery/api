import { Injectable } from '@nestjs/common';
import { LEVEL } from 'triple-beam';
import { format } from 'winston';
import * as chalk from 'chalk';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { Config } from '../../../config';
import { LoggerConstant } from './logger.constant';

@Injectable()
export class LoggerFormat {
    constructor(
        private config: ConfigService,
        private cls: ClsService,
    ) {}

    private timezone = this.config.get<string>('TZ');

    public readonly console = format.combine(
        format.timestamp({ format: `YYYY-MM-DD HH:mm:ss.SSS` }),
        format.prettyPrint(),
        format.simple(),
        format.splat(),
        format.ms(),
        format.printf(info => {
            const appName = chalk.green(`[${Config.APP_NAME}]`);
            const pid = chalk.green(`${process.pid}`);
            const hyphen = chalk.green('-');
            const timestamp = info.timestamp + ` (${this.timezone})`;
            const logId = chalk.underline.white(this.cls.getId() || ' '.repeat(20));
            const level = LoggerConstant.LEVEL_COLORS[info.level](info.level.toUpperCase().padStart(5));
            const source = info.context ? chalk.yellow(`[${info.context}]`) : '';
            const message = info.message;
            const ms = chalk.yellow(info.ms);

            return `${appName} ${pid} ${hyphen} ${timestamp} ${logId} ${level} ${source} ${message} ${ms} ${
                info.error && info[LEVEL] === 'error' ? `\n${info.error.stack}` : ''
            }${info.debugObject ? `\n${info.debugObject}` : ''}`;
        }),
    );

    public readonly http = format.combine(
        this.levelFilter('http'),
        format.timestamp({ format: `YYYY-MM-DD HH:mm:ss.SSS` }),
        format.printf(info => {
            return `${chalk.gray(`========================= HTTP =========================`)}
APP_NAME: ${Config.APP_NAME}
PID: ${process.pid}
TIMESTAMP: ${info.timestamp + ` (${this.timezone})`}
LOG_ID: ${this.cls.getId() || null}
LEVEL: ${info.level.toUpperCase()}
SCOPE: ${info.context}
${chalk.green(`REQUEST:
${this.formatObjectToUppercase(info.request)}`)}
${chalk.yellow(`RESPONSE:
${this.formatObjectToUppercase(info.response)}`)}
`;
        }),
    );

    public readonly error = format.combine(
        format.timestamp({ format: `YYYY-MM-DD HH:mm:ss.SSS` }),
        format.printf(info => {
            return `${chalk.gray(`========================= ERROR =========================`)}
APP_NAME: ${Config.APP_NAME}
PID: ${process.pid}
TIMESTAMP: ${info.timestamp + ` (${this.timezone})`}
LOG_ID: ${this.cls.getId() || null}
LEVEL: ${info.level.toUpperCase()}
SCOPE: ${info.context || null}
${chalk.redBright(`ERROR:
  MESSAGE: ${info.message}
  STACK: ${info.stack}`)}

`;
        }),
    );

    private levelFilter(level: string) {
        return format(info => {
            if (info.level !== level) {
                return false;
            }
            return info;
        })();
    }

    public formatObjectToUppercase(obj: Record<string, any>, indent = 4): string {
        return Object.entries(obj)
            .map(([key, value]) => {
                // 값이 객체인 경우 재귀적으로 처리
                if (typeof value === 'object' && value !== null) {
                    return `${' '.repeat(indent)}${key.toUpperCase()}:\n${this.formatObjectToUppercase(value, indent + 4)}`;
                } else {
                    return `${' '.repeat(indent)}${key.toUpperCase()}: ${value}`;
                }
            })
            .join('\n');
    }

    public formatObject(obj: Record<string, any>, indent = 4): string {
        return Object.entries(obj)
            .map(([key, value]) => {
                // 값이 객체인 경우 재귀적으로 처리
                if (typeof value === 'object' && value !== null) {
                    return `${' '.repeat(indent)}${key}:\n${this.formatObjectToUppercase(value, indent + 4)}`;
                } else {
                    return `${' '.repeat(indent)}${key}: ${value}`;
                }
            })
            .join('\n');
    }
}
