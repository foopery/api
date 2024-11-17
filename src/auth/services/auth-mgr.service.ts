import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';
import { AdminMgrService } from '../../admin/services/admin-mgr.service';
import { AuthConstant } from '../auth.constant';
import { AuthLoginDto } from '../dto/auth.login.dto';
import { EnvService } from '../../_utils/modules/env/env.service';

@Injectable()
export class AuthMgrService {
    constructor(
        private jwtService: JwtService,
        private envService: EnvService,
        private bcryptService: BcryptService,
        private adminMgrService: AdminMgrService,
    ) {}

    /**
     * @ApiMethod login
     * 일반 로그인 프로세스
     * */
    async executeLogin(data: AuthLoginDto) {
        const admin = await this.adminMgrService.findByLoginIdOrThrowForAuth(data.loginId);

        const passwordCompare = await this.bcryptService.compare(data.password, admin.password!, {
            secretKey: this.envService.get('ADMIN_PASSWORD_SECRET_KEY') as string,
        });
        if (!passwordCompare) throw new UnauthorizedException(AuthConstant.LOGIN_FAILED_MESSAGE);

        await this.adminMgrService.findOrThrowNotAllowedStatus(admin.id);
        await this.adminMgrService.updateLastLoginAt(admin.id);

        return { accessToken: await this.jwtSign(admin.id) };
    }

    /** JWT 토큰 생성 */
    async jwtSign(id: number) {
        return this.jwtService.signAsync(
            { id, isAdmin: true },
            { secret: this.envService.get('ADMIN_PASSWORD_SECRET_KEY'), expiresIn: this.envService.get('ADMIN_ACCESS_TOKEN_EXPIRES_IN') },
        );
    }
}
