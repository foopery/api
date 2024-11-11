import { ApiController } from '../../_utils/decorators/api-controller.decorator';
import { Body, Get, Post, Query } from '@nestjs/common';
import { AdminMgrService } from '../services/admin-mgr.service';
import { AdminMgrCreateDto } from '../dto/admin.mgr.create.dto';
import { Account } from '../../_utils/decorators/account.decorator';
import { AppPayload } from '../../auth/auth.types';
import { ApiDefaultResponse } from '@nestjs/swagger';
import { ApiDetail } from '../../_utils/decorators/api-detail.decorator';
import { AdminMgrFindListDto } from '../dto/admin.mgr.find-list.dto';
import { AdminMgrFindListResponseDto } from '../dto/response/admin.mgr.find-list.response.dto';

@ApiController('management/admins')
export class AdminMgrController {
    constructor(private service: AdminMgrService) {}

    @Post()
    @ApiDetail('관리자 생성', { isAuth: false })
    async create(@Account() account: AppPayload, @Body() body: AdminMgrCreateDto) {
        return await this.service.create(body);
    }

    @Get('list')
    @ApiDetail('관리자 목록 조회', { isAuth: false })
    async findList(@Query() query: AdminMgrFindListDto): Promise<AdminMgrFindListResponseDto> {
        return await this.service.findList(query);
    }
}
