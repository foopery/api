import { Injectable } from '@nestjs/common';
import { AuthMgrProcessor } from './auth-mgr.processor';
import { AuthMgrLoginInterface } from './interfaces/auth-mgr.login.interface';
import { apiResponse } from '../../_utils/functions/api-response.function';
import { AuthConstant } from '../auth.constant';

@Injectable()
export class AuthMgrService {
    constructor(private processor: AuthMgrProcessor) {}

    /** 일반 로그인 */
    async login(data: AuthMgrLoginInterface) {
        const { accessToken } = await this.processor.executeLogin(data);
        return apiResponse(AuthConstant.LOGIN_SUCCESS_MESSAGE, { accessToken });
    }
}
