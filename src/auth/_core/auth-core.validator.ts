import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConstant } from '../auth.constant';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';

@Injectable()
export class AuthCoreValidator {
    constructor(private bcryptService: BcryptService) {}

    throwIfLoginFailed<T>(resource: T | null): asserts resource is NonNullable<T> {
        if (!resource) throw new UnauthorizedException(AuthConstant.LOGIN_FAILED_MESSAGE);
    }
}
