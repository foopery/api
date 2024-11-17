import { ApiResponseDto } from '../../../_utils/dto/api-response.dto';
import { OmitType, PickType } from '@nestjs/swagger';
import { AdminEntity } from '../../admin.entity';

export class AdminMgrCreateResponseDto extends ApiResponseDto {
    data: AdminMgrCreateModel;
}

export class AdminMgrCreateModel extends PickType(AdminEntity, ['id']) {}
