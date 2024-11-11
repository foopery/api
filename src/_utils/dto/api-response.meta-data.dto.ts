import { ApiResponseDto } from './api-response.dto';
import { FindListMetaDataDto } from './find-list-meta-data.dto';

export class ApiResponseWithMetadataDto extends ApiResponseDto {
    /** 목록 조회용 메타 데이터 */
    meta: FindListMetaDataDto;
}
