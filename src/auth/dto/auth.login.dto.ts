import { IsString, Matches } from 'class-validator';
import { RegexpConstant } from '../../_utils/constants/regexp.constants';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
    @ApiProperty({ description: '로그인 아이디' })
    @IsString({ message: '아이디와 패스워드를 확인해주세요.' })
    @Matches(RegexpConstant.loginId, { message: '아이디와 패스워드를 확인해주세요.' })
    loginId!: string;

    @ApiProperty({ description: '패스워드' })
    @IsString({ message: '아이디와 패스워드를 확인해주세요.' })
    @Matches(RegexpConstant.password, { message: '아이디와 패스워드를 확인해주세요.' })
    password!: string;
}
