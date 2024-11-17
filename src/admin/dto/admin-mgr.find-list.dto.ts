import { PaginationDto } from '../../_utils/dto/pagination.dto';
import { IsEnum } from 'class-validator';
import { AdminMgrFindListSort } from '../enums/admin-mgr.find-list.sort.enum';
import { IntersectionType } from '@nestjs/swagger';

export class AdminMgrFindListDto extends IntersectionType(PaginationDto) {
    @IsEnum(AdminMgrFindListSort)
    sort!: AdminMgrFindListSort;
}
