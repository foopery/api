import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../_utils/modules/database/database.service';
import { AdminMgrCreateInterface } from '../interfaces/admin-mgr.create.interface';
import { AdminMgrFindListInterface } from '../interfaces/admin-mgr.find-list.interface';
import { Prisma } from '@prisma/client';
import { AdminMgrFindListSort } from '../enums/admin-mgr.find-list.sort.enum';
import { getFindListMetadata } from '../../_utils/functions/get-find-list.metadata.function';
import { AdminMgrUpdateInterface } from '../interfaces/admin-mgr.update.interface';

@Injectable()
export class AdminMgrRepository {
    private repository = this.database.admin;
    constructor(private database: DatabaseService) {}

    async create(data: AdminMgrCreateInterface) {
        return this.repository.create({ data });
    }

    async update(id: number, data: AdminMgrUpdateInterface) {
        return this.repository.update({ where: { id }, data });
    }

    async updateLastLoginAt(id: number) {
        return this.repository.update({ where: { id }, data: { lastLoginAt: new Date() } });
    }

    async findFirstByLoginId(loginId: string) {
        return this.repository.findFirst({ where: { loginId, deletedAt: null } });
    }

    async findUnique(id: number) {
        return this.repository.findUnique({ where: { id } });
    }

    async countByLoginId(loginId: string) {
        return this.repository.count({ where: { loginId } });
    }

    async findList(data: AdminMgrFindListInterface) {
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
