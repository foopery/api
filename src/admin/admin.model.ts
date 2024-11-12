import { ApiProperty } from '@nestjs/swagger';

export class AdminModel {
    @ApiProperty({ description: '아이디' })
    id!: number;

    @ApiProperty({ description: '상태' })
    status!: number;

    @ApiProperty({ description: '권한' })
    role!: number;

    @ApiProperty({ description: '로그인 아이디', nullable: true })
    loginId!: string | null;

    @ApiProperty({ description: '패스워드', nullable: true })
    password!: string | null;

    @ApiProperty({ description: '이름', nullable: true })
    name!: string | null;

    @ApiProperty({ description: '생년월일', nullable: true })
    birthDate!: string | null;

    @ApiProperty({ description: '프로필 이미지 url', nullable: true })
    profileImageUrl!: string | null;

    @ApiProperty({ description: '마지막 로그인 일자', example: 'YYYY-MM-DD HH:mm:ss', nullable: true })
    lastLoginAt!: Date | null;

    @ApiProperty({ description: '생성일', example: 'YYYY-MM-DD HH:mm:ss' })
    createdAt!: Date;

    @ApiProperty({ description: '수정일', example: 'YYYY-MM-DD HH:mm:ss', nullable: true })
    updatedAt!: Date | null;

    @ApiProperty({ description: '삭제일', example: 'YYYY-MM-DD HH:mm:ss', nullable: true })
    deletedAt!: Date | null;
}
