import { ApiResponseDto } from '../../../_utils/dto/api-response.dto';
import { OmitType, PickType } from '@nestjs/swagger';
import { AdminModel } from '../../admin.model';

export class AdminMgrCreateResponseDto extends ApiResponseDto {
    data: AdminMgrCreateModel;
}

export class AdminMgrCreateModel extends PickType(AdminModel, ['id']) {}
