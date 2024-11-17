import { Injectable } from '@nestjs/common';
import { LoggerSystem } from './logger.system';

@Injectable()
export class LoggerService {
    constructor(private system: LoggerSystem) {}

    log(content: any, ...optionalParams: any[]) {
        this.system.logging('info', content, optionalParams);
    }

    error(content: any, ...optionalParams: any[]) {
        this.system.logging('error', content, optionalParams);
    }

    http(content: any, ...optionalParams: any[]) {
        this.system.logging('http', content, optionalParams);
    }

    warn(content: any, ...optionalParams: any[]) {
        this.system.logging('warn', content, optionalParams);
    }

    debug(content: any, ...optionalParams: any[]) {
        this.system.logging('debug', content, optionalParams);
    }

    query(content: any, ...optionalParams: any[]) {
        this.system.logging('query', content, optionalParams);
    }
}
