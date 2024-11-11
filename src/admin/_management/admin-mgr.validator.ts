import { ConflictException, Injectable } from '@nestjs/common';
import { AdminConstants } from '../admin.constants';
import { AdminMgrRepository } from './admin-mgr.repository';

@Injectable()
export class AdminMgrValidator {
    constructor(private repository: AdminMgrRepository) {}

    async throwIfLoginIdExists(loginId: string) {
        const loginIdCount = await this.repository.countByLoginId(loginId);
        if (loginIdCount) throw new ConflictException(AdminConstants.EXISTS_LOGIN_ID_MESSAGE);
    }
}
