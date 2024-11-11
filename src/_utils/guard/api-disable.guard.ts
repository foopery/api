import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiDisableGuard implements CanActivate {
    canActivate(context: ExecutionContext): any {
        const request = context.switchToHttp().getRequest();
        throw new NotFoundException(`Cannot GET ${request.url}`);
    }
}
