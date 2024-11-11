import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../_utils/modules/database/database.service';
import { AdminMgrCreateInterface } from '../interfaces/admin-mgr.create.interface';

@Injectable()
export class AdminMgrRepository {
    private repository = this.database.admin;
    constructor(private database: DatabaseService) {}

    async create(data: AdminMgrCreateInterface) {
        return this.repository.create({ data });
    }

    async findFirstByLoginId(loginId: string) {
        return this.repository.findFirst({ where: { loginId, deletedAt: null } });
    }

    async countByLoginId(loginId: string) {
        return this.repository.count({ where: { loginId } });
    }

    async onModuleInit() {
        const test = await this.repository.findMany();
        console.log('result', test);
    }
}
