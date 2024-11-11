import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    private readonly passwordSecretKey: string;
    private readonly passwordSalt: number;
    constructor(private config: ConfigService) {
        const passwordSecretKey = config.get('PASSWORD_SECRET_KEY');
        const passwordSalt = Number(config.get('PASSWORD_SALT'));

        if (!passwordSecretKey) throw new Error('PASSWORD_SECRET_KEY 환경변수 값이 누락되었습니다.');
        if (!passwordSalt) throw new Error('PASSWORD_SALT 환경변수 값이 누락되었거나, 정수로 설정되지 않았습니다.');

        this.passwordSecretKey = passwordSecretKey;
        this.passwordSalt = Number(passwordSalt);
    }

    async hash(data: string, options: { secretKey?: string; salt: number }): Promise<string> {
        return await bcrypt.hash(data + options.secretKey, options.salt);
    }

    async compare(data: string, hashData: string, options: { secretKey?: string }): Promise<boolean> {
        return await bcrypt.compare(data + options.secretKey, hashData);
    }

    async hashPassword(password: string): Promise<string> {
        return this.hash(password, { secretKey: this.passwordSecretKey, salt: this.passwordSalt });
    }

    async comparePassword(password: string, hashPassword: string) {
        return await this.compare(password, hashPassword, { secretKey: this.passwordSecretKey });
    }
}
