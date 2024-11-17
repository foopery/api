import { ApiResponseDto } from '../../../_utils/dto/api-response.dto';

export class AuthMgrLoginResponseDto extends ApiResponseDto {
    data: { accessToken: string };
}
