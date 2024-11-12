import { ApiController } from '../../_utils/decorators/api-controller.decorator';
import { Body, Post } from '@nestjs/common';
import { AuthMgrLoginDto } from '../dto/auth-mgr.login.dto';
import { AuthMgrService } from '../services/auth-mgr.service';
import { AuthMgrLoginResponseDto } from '../dto/response/auth-mgr.login.response.dto';
import { ApiDetail } from '../../_utils/decorators/api-detail.decorator';

@ApiController('management/auth')
export class AuthMgrController {
    constructor(private service: AuthMgrService) {}

    @Post('login')
    @ApiDetail('일반 로그인', { isAuth: false })
    async login(@Body() body: AuthMgrLoginDto): Promise<AuthMgrLoginResponseDto> {
        return await this.service.login(body);
    }
}
