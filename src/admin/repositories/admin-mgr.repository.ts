import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../_utils/modules/database/database.service';
import { Prisma } from '@prisma/client';
import { AdminMgrFindListSort } from '../enums/admin-mgr.find-list.sort.enum';
import { getFindListMetadata } from '../../_utils/functions/get-find-list.metadata.function';
import { AdminMgrCreateDto } from '../dto/admin-mgr.create.dto';
import { AdminMgrUpdateDto } from '../dto/admin-mgr.update.dto';
import { AdminMgrFindListDto } from '../dto/admin-mgr.find-list.dto';

@Injectable()
export class AdminMgrRepository {
    private repository = this.database.admin;
    constructor(private database: DatabaseService) {}

    async create(data: AdminMgrCreateDto) {
        return this.repository.create({ data });
    }

    async update(id: number, data: AdminMgrUpdateDto) {
        return this.repository.update({ where: { id }, data });
    }

    async updateLastLoginAt(id: number) {
        return this.repository.update({ where: { id }, data: { lastLoginAt: new Date() } });
    }

    async findFirstByLoginId(loginId: string) {
        return this.repository.findFirst({ where: { loginId, deletedAt: null } });
    }

    async findUnique(id: number) {
        return this.repository.findUnique({ where: { id, deletedAt: null } });
    }

    async countByLoginId(loginId: string) {
        return this.repository.count({ where: { loginId, deletedAt: null } });
    }

    async count() {
        return this.repository.count({ where: { deletedAt: null } });
    }

    async findList(data: AdminMgrFindListDto) {
        const options = Prisma.validator<Prisma.AdminFindManyArgs>()({
            where: {},
            take: data.take,
            skip: (data.page - 1) * data.take,
            omit: { password: true },
            orderBy: (() => {
                const { CREATED_AT_ASC, CREATED_AT_DESC } = AdminMgrFindListSort;

                switch (data.sort) {
                    case CREATED_AT_ASC:
                        return { createdAt: 'asc' };
                    case CREATED_AT_DESC:
                        return { createdAt: 'desc' };
                    default:
                        return {};
                }
            })(),
        });

        const [resources, totalCount] = await this.database.$transaction([this.repository.findMany(options), this.repository.count({ where: options.where })]);

        return { resources, meta: getFindListMetadata(data, totalCount) };
    }
}
