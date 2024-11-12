import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {}

    use(request: Request, response: Response, next: NextFunction): void {
        const authorization = request.headers?.authorization;

        if (authorization) {
            const token = authorization.split(' ')[1];
            const account = this.jwtService.decode(token);
            request['account'] = account;
        }

        next();
    }
}
