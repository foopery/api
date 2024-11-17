import { ApiController } from '../../_utils/decorators/api-controller.decorator';
import { Body, Post } from '@nestjs/common';
import { AuthLoginDto } from '../dto/auth.login.dto';
import { AuthMgrPresenter } from '../presenters/auth-mgr.presenter';
import { AuthMgrLoginResponseDto } from '../dto/response/auth-mgr.login.response.dto';
import { ApiDetail } from '../../_utils/decorators/api-detail.decorator';

@ApiController('management/auth')
export class AuthMgrController {
    constructor(private service: AuthMgrPresenter) {}

    @Post('login')
    @ApiDetail('일반 로그인', { isAuth: false })
    async login(@Body() body: AuthLoginDto): Promise<AuthMgrLoginResponseDto> {
        return await this.service.login(body);
    }
}
