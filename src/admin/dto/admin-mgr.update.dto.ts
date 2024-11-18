import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { AdminEntity } from '../admin.entity';

export class AdminMgrUpdateDto extends IntersectionType(PartialType(OmitType(AdminEntity, ['deletedAt']))) {}
