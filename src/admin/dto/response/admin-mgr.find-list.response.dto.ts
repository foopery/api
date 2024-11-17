import { OmitType } from '@nestjs/swagger';
import { AdminEntity } from '../../admin.entity';
import { ApiResponseWithMetadataDto } from '../../../_utils/dto/api-response.meta-data.dto';

export class AdminMgrFindListResponseDto extends ApiResponseWithMetadataDto {
    data: AdminMgrFindListModel[];
}

export class AdminMgrFindListModel extends OmitType(AdminEntity, ['password']) {}
