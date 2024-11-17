import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    async hash(data: string, options: { secretKey?: string; salt: number }): Promise<string> {
        return await bcrypt.hash(data + options.secretKey, Number(options.salt));
    }

    async compare(data: string, hashData: string, options: { secretKey?: string }): Promise<boolean> {
        return await bcrypt.compare(data + options.secretKey, hashData);
    }
}
