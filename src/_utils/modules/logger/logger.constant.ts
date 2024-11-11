import * as chalk from 'chalk';
import { LogColor, LogValue } from './logger.types';

export class LoggerConstant {
    /** 로거에 사용될 로그 레벨 */
    static readonly LEVELS = ['error', 'warn', 'info', 'http', 'debug', 'query'] as const;

    /** 윈스톤 레벨 설정에 사용될 값 */
    static readonly LEVEL_VALUES: LogValue = {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        debug: 4,
        query: 5,
    } as const;

    /** 출력에 사용될 레벨별 색상 */
    static readonly LEVEL_COLORS: LogColor = {
        error: chalk.red,
        warn: chalk.yellow,
        info: chalk.green,
        http: chalk.blue,
        debug: chalk.cyan,
        query: chalk.magenta,
    } as const;
}
