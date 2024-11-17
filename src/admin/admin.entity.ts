import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsString, Matches } from 'class-validator';
import { AdminStatus } from './enums/admin.status.enum';
import { AdminRole } from './enums/admin.role.enum';
import { RegexpConstant } from '../_utils/constants/regexp.constants';

export class AdminEntity {
    @ApiProperty({ description: '아이디' })
    @IsInt()
    id!: number;

    @ApiProperty({ description: '상태' })
    @IsEnum(AdminStatus)
    status!: number;

    @ApiProperty({ description: '권한' })
    @IsEnum(AdminRole)
    role!: number;

    @ApiProperty({ description: '로그인 아이디', nullable: true })
    @IsString()
    @Matches(RegexpConstant.loginId)
    loginId!: string | null;

    @ApiProperty({ description: '패스워드', nullable: true })
    @IsString()
    @Matches(RegexpConstant.password)
    password!: string | null;

    @ApiProperty({ description: '이름', nullable: true })
    @IsString()
    name!: string | null;

    @ApiProperty({ description: '생년월일', nullable: true })
    @IsString()
    @Matches(RegexpConstant.date)
    birthDate!: string | null;

    @ApiProperty({ description: '프로필 이미지 url', nullable: true })
    @IsString()
    profileImageUrl!: string | null;

    @ApiProperty({ description: '마지막 로그인 일자', example: 'YYYY-MM-DD HH:mm:ss', nullable: true })
    @IsDate()
    lastLoginAt!: Date | null;

    @ApiProperty({ description: '생성일', example: 'YYYY-MM-DD HH:mm:ss' })
    @IsDate()
    createdAt!: Date;

    @ApiProperty({ description: '수정일', example: 'YYYY-MM-DD HH:mm:ss', nullable: true })
    @IsDate()
    updatedAt!: Date | null;

    @ApiProperty({ description: '삭제일', example: 'YYYY-MM-DD HH:mm:ss', nullable: true })
    @IsDate()
    deletedAt!: Date | null;
}
