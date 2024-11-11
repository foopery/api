import { Injectable } from '@nestjs/common';
import { AdminMgrProcessor } from './admin-mgr.processor';
import { AdminMgrCreateInterface } from './interfaces/admin-mgr.create.interface';
import { apiResponse } from '../../_utils/functions/api-response.function';
import { AdminConstants } from '../admin.constants';

@Injectable()
export class AdminMgrService {
    constructor(private processor: AdminMgrProcessor) {}

    async create(data: AdminMgrCreateInterface) {
        const resource = await this.processor.executeCreate(data);
        return apiResponse(AdminConstants.CREATE_MESSAGE, resource);
    }
}
