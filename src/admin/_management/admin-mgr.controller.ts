import { ApiController } from '../../_utils/decorators/api-controller.decorator';
import { Body, Post } from '@nestjs/common';
import { AdminMgrService } from './admin-mgr.service';
import { AdminMgrCreateDto } from './dto/admin-mgr.create.dto';
import { Account } from '../../_utils/decorators/account.decorator';
import { AppPayload } from '../../auth/auth.types';
import { AdminDto } from '../admin.dto';

@ApiController('management/admins')
export class AdminMgrController {
    constructor(private service: AdminMgrService) {}

    @Post()
    async create(@Account() account: AppPayload, @Body() body: AdminDto) {
        return await this.service.create(body);
    }
}
