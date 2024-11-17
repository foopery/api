export class ApiMessageOnlyResponseDto {
    /**
     * 반환 메세지
     * @example "결과 메세지가 반환됩니다."
     * */
    message!: string;

    /**
     * 반환 데이터
     * @example null
     * */
    data: null;
}
