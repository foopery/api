import { ApiResponseDto } from '../../../../_utils/dto/response.dto';

export class AuthMgrLoginResponseDto extends ApiResponseDto {
    data: { accessToken: string };
}
