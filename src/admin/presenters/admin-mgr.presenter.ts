import { Injectable } from '@nestjs/common';
import { apiResponse } from '../../_utils/functions/api-response.function';
import { AdminConstant } from '../admin.constant';
import { AdminMgrService } from '../services/admin-mgr.service';
import { AdminMgrCreateDto } from '../dto/admin-mgr.create.dto';
import { AdminMgrUpdateDto } from '../dto/admin-mgr.update.dto';
import { AdminMgrFindListDto } from '../dto/admin-mgr.find-list.dto';

@Injectable()
export class AdminMgrPresenter {
    constructor(private service: AdminMgrService) {}

    async create(data: AdminMgrCreateDto) {
        const resource = await this.service.create(data);
        return apiResponse(AdminConstant.CREATE_MESSAGE, resource);
    }

    async update(id: number, data: AdminMgrUpdateDto) {
        await this.service.update(id, data);
        return apiResponse(AdminConstant.UPDATE_MESSAGE);
    }

    async find(id: number) {
        const resource = await this.service.find(id);
        return apiResponse(AdminConstant.FIND_MESSAGE, resource);
    }

    async findList(data: AdminMgrFindListDto) {
        const { resources, meta } = await this.service.findList(data);
        return apiResponse(AdminConstant.FIND_LIST_MESSAGE, resources, meta);
    }
}
