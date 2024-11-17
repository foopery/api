import { Injectable } from '@nestjs/common';
import { AuthMgrService } from '../services/auth-mgr.service';
import { apiResponse } from '../../_utils/functions/api-response.function';
import { AuthConstant } from '../auth.constant';
import { AuthLoginDto } from '../dto/auth.login.dto';

@Injectable()
export class AuthMgrPresenter {
    constructor(private service: AuthMgrService) {}

    /** 일반 로그인 */
    async login(data: AuthLoginDto) {
        const { accessToken } = await this.service.executeLogin(data);
        return apiResponse(AuthConstant.LOGIN_SUCCESS_MESSAGE, { accessToken });
    }
}
