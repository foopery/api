import { ApiController } from '../../_utils/decorators/api-controller.decorator';
import { Body, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AdminMgrPresenter } from '../presenters/admin-mgr.presenter';
import { AdminMgrCreateDto } from '../dto/admin-mgr.create.dto';
import { Account } from '../../_utils/decorators/account.decorator';
import { ApiDetail } from '../../_utils/decorators/api-detail.decorator';
import { AdminMgrFindListDto } from '../dto/admin-mgr.find-list.dto';
import { AdminMgrFindListResponseDto } from '../dto/response/admin-mgr.find-list.response.dto';
import { AdminMgrCreateResponseDto } from '../dto/response/admin-mgr.create.response.dto';
import { AdminMgrUpdateDto } from '../dto/admin-mgr.update.dto';
import { AdminMgrUpdateResponseDto } from '../dto/response/admin-mgr.update.response.dto';
import { AppPayload } from '../../auth/auth.types';
import { AdminMgrFindResponseDto } from '../dto/response/admin-mgr.find.response.dto';

@ApiController('management/admins')
export class AdminMgrController {
    constructor(private service: AdminMgrPresenter) {}

    @Post()
    @ApiDetail('관리자 생성', { isAuth: false })
    async create(@Account() account: AppPayload, @Body() body: AdminMgrCreateDto): Promise<AdminMgrCreateResponseDto> {
        return await this.service.create(body);
    }

    @Put(':id')
    @ApiDetail('관리자 수정', { isAuth: false })
    async update(@Param('id', ParseIntPipe) id: number, @Body() body: AdminMgrUpdateDto): Promise<AdminMgrUpdateResponseDto> {
        return await this.service.update(id, body);
    }

    @Get('list')
    @ApiDetail('관리자 목록 조회', { isAuth: false })
    async findList(@Query() query: AdminMgrFindListDto): Promise<AdminMgrFindListResponseDto> {
        return await this.service.findList(query);
    }

    @Get(':id')
    @ApiDetail('관리자 조회', { isAuth: false })
    async find(@Param('id', ParseIntPipe) id: number): Promise<AdminMgrFindResponseDto> {
        return await this.service.find(id);
    }
}
