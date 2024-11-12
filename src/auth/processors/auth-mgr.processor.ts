import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthMgrLoginInterface } from '../interfaces/auth-mgr.login.interface';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';
import { AdminMgrProcessor } from '../../admin/processors/admin-mgr.processor';
import { AuthConstant } from '../auth.constant';

@Injectable()
export class AuthMgrProcessor {
    private readonly secretKey: string;
    private readonly expiresIn: string;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private bcryptService: BcryptService,
        private adminProcessor: AdminMgrProcessor,
    ) {
        const secretKey = configService.get('ADMIN_ACCESS_TOKEN_SECRET_KEY');
        const expiresIn = configService.get('ADMIN_ACCESS_TOKEN_EXPIRES_IN');

        if (!secretKey) throw new Error('ADMIN_ACCESS_TOKEN_SECRET_KEY 환경변수 값이 누락되었습니다.');
        if (!expiresIn) throw new Error('ADMIN_ACCESS_TOKEN_EXPIRES_IN 환경변수 값이 누락되었습니다.');

        this.secretKey = secretKey;
        this.expiresIn = expiresIn;
    }

    /**
     * @ApiMethod login
     * 일반 로그인 프로세스
     * */
    async executeLogin(data: AuthMgrLoginInterface) {
        const admin = await this.adminProcessor.findByLoginIdOrThrowForAuth(data.loginId);

        const passwordCompare = await this.bcryptService.comparePassword(data.password, admin.password!);
        if (!passwordCompare) throw new UnauthorizedException(AuthConstant.LOGIN_FAILED_MESSAGE);

        await this.adminProcessor.findOrThrowNotAllowedStatus(admin.id);
        await this.adminProcessor.updateLastLoginAt(admin.id);

        return { accessToken: await this.jwtSign(admin.id) };
    }

    /** JWT 토큰 생성 */
    async jwtSign(id: number) {
        return this.jwtService.signAsync({ id, isAdmin: true }, { secret: this.secretKey, expiresIn: this.expiresIn });
    }
}
