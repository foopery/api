import * as chalk from 'chalk';
import { LoggerConstant } from './logger.constant';

export type LogLevel = (typeof LoggerConstant.LEVELS)[number];

export type LogValue = Record<LogLevel, number>;
export type LogColor = Record<LogLevel, chalk.Chalk>;
