import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
    canActivate(context: ExecutionContext): false | true | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        // const role = this.reflector.get('Roles', context.getHandler());
        return this.validator();
    }

    async validator() {
        return true;
    }
}
