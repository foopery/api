import { IsEnum, IsString, Matches } from 'class-validator';
import { RegexpConstant } from '../_utils/constants/regexp.constants';
import { ApiProperty } from '@nestjs/swagger';
import { AdminStatus } from './enums/admin.status.enum';
import { AdminRole } from './enums/admin.role.enum';

export class AdminDto {
    @ApiProperty({ description: '상태' })
    @IsEnum(AdminStatus)
    status!: AdminStatus;

    @ApiProperty({ description: '권한' })
    @IsEnum(AdminRole)
    role!: AdminRole;

    @ApiProperty({ description: '로그인 아이디' })
    @IsString()
    @Matches(RegexpConstant.loginId)
    loginId!: string;

    @ApiProperty({ description: '패스워드' })
    @IsString()
    @Matches(RegexpConstant.password)
    password!: string;

    @ApiProperty({ description: '이름' })
    @IsString()
    name!: string;

    @ApiProperty({ description: '생년월일', example: 'YYYY-MM-DD' })
    @IsString()
    @Matches(RegexpConstant.date)
    birthDate!: string;

    @ApiProperty({ description: '프로필 이미지 url' })
    @IsString()
    profileImageUrl!: string;
}
