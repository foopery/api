import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';
import { LoggerService } from '../modules/logger/logger.service';

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
    constructor(
        private logger: LoggerService,
        private cls: ClsService,
    ) {}

    intercept(context: ExecutionContext, call$: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();

        return call$.handle().pipe(
            tap(data => {
                try {
                    const response: Response = context.switchToHttp().getResponse();

                    const logMessage = `{${req.originalUrl}, ${response.statusCode}, ${req.ip || null}, ${Date.now() - this.cls.get<number>('now')}ms}`;

                    this.logger.http(logMessage, 'HttpInterceptor', {
                        request: {
                            ip: req.ip || null,
                            method: req.method,
                            originalUrl: req.originalUrl,
                            account: req.account || null,
                            headers: req.headers,
                            body: req.body,
                            query: req.query,
                            params: req.params,
                        },
                        response: { header: response.getHeaders(), data },
                    });
                } catch (error) {
                    this.logger.error('로그 출력 중 에러가 발생했습니다', error, this.constructor.name);
                }
            }),
        );
    }
}
