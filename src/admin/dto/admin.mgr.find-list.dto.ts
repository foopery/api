import { PaginationDto } from '../../_utils/dto/pagination.dto';
import { IsEnum } from 'class-validator';
import { AdminMgrFindListSort } from '../enums/admin.mgr.find-list.sort.enum';

export class AdminMgrFindListDto extends PaginationDto {
    @IsEnum(AdminMgrFindListSort)
    sort!: AdminMgrFindListSort;
}
