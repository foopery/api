import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { AdminEntity } from '../admin.entity';

export class AdminMgrCreateDto extends IntersectionType(
    PickType(AdminEntity, ['status', 'role', 'loginId', 'password', 'name']),
    PartialType(PickType(AdminEntity, ['birthDate', 'profileImageUrl'])),
) {}
