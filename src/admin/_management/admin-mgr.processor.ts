import { Injectable } from '@nestjs/common';
import { AdminMgrRepository } from './admin-mgr.repository';
import { AdminMgrCreateInterface } from './interfaces/admin-mgr.create.interface';
import { LoggerService } from '../../_utils/modules/logger/logger.service';
import { AdminMgrValidator } from './admin-mgr.validator';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';

@Injectable()
export class AdminMgrProcessor {
    constructor(
        private validator: AdminMgrValidator,
        private logger: LoggerService,
        private repository: AdminMgrRepository,
        private bcryptService: BcryptService,
    ) {}

    async executeCreate(data: AdminMgrCreateInterface) {
        await this.validator.throwIfLoginIdExists(data.loginId);
        data.password = await this.bcryptService.hashPassword(data.password);
        return this.repository.create(data);
    }
}
