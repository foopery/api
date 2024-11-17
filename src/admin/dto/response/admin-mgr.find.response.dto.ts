import { ApiResponseDto } from '../../../_utils/dto/api-response.dto';
import { OmitType } from '@nestjs/swagger';
import { AdminEntity } from '../../admin.entity';

export class AdminMgrFindResponseDto extends ApiResponseDto {
    data: AdminMgrFindModel;
}

export class AdminMgrFindModel extends OmitType(AdminEntity, []) {}
