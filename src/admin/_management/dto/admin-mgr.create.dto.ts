import { AdminDto, AdminOptionalDto } from '../../admin.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class AdminMgrCreateDto extends IntersectionType(
    PickType(AdminDto, ['status', 'role', 'loginId', 'password', 'name']),
    PickType(AdminOptionalDto, ['birthDate', 'profileImageUrl']),
) {}
