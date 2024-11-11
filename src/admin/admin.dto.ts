import { IsDate, IsEnum, IsOptional, IsString, Matches } from 'class-validator';
import { AdminRole, AdminStatus } from './admin.enums';
import { RegexpConstant } from '../_utils/constants/regexp.constants';
import { ApiProperty } from '@nestjs/swagger';

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

    @ApiProperty({ description: '생년월일' })
    @IsDate()
    birthDate!: Date;

    @ApiProperty({ description: '프로필 이미지 url' })
    @IsString()
    profileImageUrl!: string;
}

export class AdminOptionalDto {
    @ApiProperty({ description: '상태' })
    @IsOptional()
    @IsEnum(AdminStatus)
    status?: AdminStatus;

    @ApiProperty({ description: '권한' })
    @IsOptional()
    @IsEnum(AdminRole)
    role?: AdminRole;

    @ApiProperty({ description: '로그인 아이디' })
    @IsOptional()
    @IsString()
    @Matches(RegexpConstant.loginId)
    loginId?: string;

    @ApiProperty({ description: '패스워드' })
    @IsOptional()
    @IsString()
    @Matches(RegexpConstant.password)
    password?: string;

    @ApiProperty({ description: '이름' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: '생년월일' })
    @IsOptional()
    @IsDate()
    birthDate?: Date;

    @ApiProperty({ description: '프로필 이미지 url' })
    @IsOptional()
    @IsString()
    profileImageUrl?: string;
}
