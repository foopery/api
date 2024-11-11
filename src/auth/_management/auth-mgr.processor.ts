import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthMgrLoginInterface } from './interfaces/auth-mgr.login.interface';
import { AdminMgrRepository } from '../../admin/repositories/admin-mgr.repository';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';
import { AuthCoreValidator } from '../_core/auth-core.validator';

@Injectable()
export class AuthMgrProcessor {
    private readonly secretKey: string;
    private readonly expiresIn: string;

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        private bcryptService: BcryptService,
        private coreValidator: AuthCoreValidator,
        private adminRepository: AdminMgrRepository,
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
        const admin = await this.adminRepository.findFirstByLoginId(data.loginId);
        this.coreValidator.throwIfLoginFailed(admin);

        const passwordCompare = await this.bcryptService.comparePassword(data.password, admin.password!);
        this.coreValidator.throwIfLoginFailed(passwordCompare);

        return { accessToken: await this.jwtSign(admin.id) };
    }

    /** JWT 토큰 생성 */
    async jwtSign(id: number) {
        return this.jwtService.signAsync({ id, isAdmin: true }, { secret: this.secretKey, expiresIn: this.expiresIn });
    }
}
