import { Injectable } from '@nestjs/common';
import { AdminMgrProcessor } from '../processors/admin-mgr.processor';
import { AdminMgrCreateInterface } from '../interfaces/admin-mgr.create.interface';
import { apiResponse } from '../../_utils/functions/api-response.function';
import { AdminConstant } from '../admin.constant';
import { AdminMgrFindListInterface } from '../interfaces/admin-mgr.find-list.interface';
import { AdminMgrUpdateInterface } from '../interfaces/admin-mgr.update.interface';

@Injectable()
export class AdminMgrService {
    constructor(private processor: AdminMgrProcessor) {}

    async create(data: AdminMgrCreateInterface) {
        const resource = await this.processor.create(data);
        return apiResponse(AdminConstant.CREATE_MESSAGE, resource);
    }

    async update(id: number, data: AdminMgrUpdateInterface) {
        await this.processor.update(id, data);
        return apiResponse(AdminConstant.UPDATE_MESSAGE);
    }

    async findList(data: AdminMgrFindListInterface) {
        const { resources, meta } = await this.processor.findList(data);
        return apiResponse(AdminConstant.FIND_LIST_MESSAGE, resources, meta);
    }
}
