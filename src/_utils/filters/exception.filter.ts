import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { LoggerService } from '../modules/logger/logger.service';
import { ValidationError } from 'class-validator';

@Catch()
export class ExceptionFilter implements ExceptionFilter {
    constructor(
        private logger: LoggerService,
        private cls: ClsService,
    ) {}
    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        try {
            if (exception?.message === 'Cannot GET /favicon.ico') return;

            const data = new Map();

            data.set('message', '알 수 없는 오류가 발생하였습니다.');
            data.set('data', null);
            data.set('status', 500);

            switch (true) {
                case exception instanceof HttpException:
                    const response = exception.getResponse();
                    const message = response['message'] instanceof Array ? response['message'][0] : response['message'];
                    data.set('message', message);
                    data.set('status', response['statusCode']);
                    break;
                default:
                    this.logger.error(exception.message, exception, this.constructor.name);
                    break;
            }

            const { status, ...body }: { status: number; message: string; data: null } = Object.fromEntries(data);

            this.logger.http(`{${req.originalUrl}, ${status}, ${req.ip}, ${Date.now() - this.cls.get<number>('now')}ms}`, this.constructor.name, {
                request: {
                    ip: req.ip || null,
                    method: req.method,
                    originalUrl: req.originalUrl,
                    account: req['account'] || null,
                    headers: req.headers,
                    body: req.body,
                    query: req.query,
                    params: req.params,
                },
                response: { header: res.getHeaders(), data: body },
            });

            return res.status(status).json(body);
        } catch (error) {
            this.logger.error('예외 필터 처리를 실패하였습니다.', error, this.constructor.name);
            return res.status(500).json({ resultCode: 500000, message: '알 수 없는 오류가 발생하였습니다.', data: null });
        }
    }
}
