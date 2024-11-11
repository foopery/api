import { AdminDto } from '../admin.dto';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';

export class AdminMgrCreateDto extends IntersectionType(
    PickType(AdminDto, ['status', 'role', 'loginId', 'password', 'name']),
    PartialType(PickType(AdminDto, ['birthDate', 'profileImageUrl'])),
) {}
