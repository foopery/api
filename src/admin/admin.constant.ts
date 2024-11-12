export class AdminConstant {
    public static readonly KEY = '관리자';

    public static readonly NOT_FOUND_MESSAGE = '관리자 정보를 찾을 수 없습니다.';
    public static readonly EXISTS_LOGIN_ID_MESSAGE = '이미 사용중인 로그인 아이디입니다.';
    public static readonly BAD_STATUS_MESSAGE = '비활성화된 관리자 계정입니다.';
    public static readonly LOGIN_ID_MISMATCH_MESSAGE = '로그인 아이디가 일치하지 않습니다.';

    public static readonly CREATE_MESSAGE = '관리자 계정이 정상 생성되었습니다.';
    public static readonly UPDATE_MESSAGE = '관리자 계정이 정상 수정되었습니다.';
    public static readonly FIND_LIST_MESSAGE = '관리자 목록 조회가 완료되었습니다.';
}
