import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { AdminDto } from '../admin.dto';

export class AdminMgrUpdateDto extends IntersectionType(PartialType(OmitType(AdminDto, ['password']))) {}
