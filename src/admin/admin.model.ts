import { ApiProperty } from '@nestjs/swagger';

export class AdminModel {
    @ApiProperty({ description: '아이디' })
    id!: number;

    @ApiProperty({ description: '상태' })
    status!: number;

    @ApiProperty({ description: '권한' })
    role!: number;

    @ApiProperty({ description: '로그인 아이디' })
    loginId!: string | null;

    @ApiProperty({ description: '패스워드' })
    password!: string | null;

    @ApiProperty({ description: '이름' })
    name!: string | null;

    @ApiProperty({ description: '생년월일' })
    birthDate!: string | null;

    @ApiProperty({ description: '프로필 이미지 url' })
    profileImageUrl!: string | null;

    @ApiProperty({ description: '생성일', example: 'YYYY-MM-DD HH:mm:ss' })
    createdAt!: Date;

    @ApiProperty({ description: '수정일', example: 'YYYY-MM-DD HH:mm:ss' })
    updatedAt!: Date | null;

    @ApiProperty({ description: '삭제일', example: 'YYYY-MM-DD HH:mm:ss' })
    deletedAt!: Date | null;
}
