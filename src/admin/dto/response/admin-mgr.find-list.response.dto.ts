import { OmitType } from '@nestjs/swagger';
import { AdminModel } from '../../admin.model';
import { ApiResponseWithMetadataDto } from '../../../_utils/dto/api-response.meta-data.dto';

export class AdminMgrFindListResponseDto extends ApiResponseWithMetadataDto {
    data: AdminMgrFindListModel[];
}

export class AdminMgrFindListModel extends OmitType(AdminModel, ['password']) {}
