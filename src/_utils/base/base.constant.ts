/** 자식 클래스에서는 필수로 static KEY 설정이 필요합니다. */
export class BaseConstant {
    /** 자식 에서 동일한 키워드로 KEY 설정이 필수입니다 */
    static readonly KEY: string = '';

    public static readonly ADD_STRING = '이(가) 추가되었습니다.';
    public static readonly CREATE_STRING = '이(가) 생성되었습니다.';
    public static readonly REGISTER_STRING = '이(가) 등록되었습니다.';
    public static readonly UNREGISTER_STRING = '이(가) 등록 취소되었습니다.';
    public static readonly CONNECT_STRING = '이(가) 연결되었습니다.';
    public static readonly DISCONNECT_STRING = '이(가) 연결 해제되었습니다.';
    public static readonly SET_STRING = '이(가) 설정되었습니다.';
    public static readonly UPDATE_STRING = '이(가) 수정되었습니다.';
    public static readonly DELETE_STRING = '이(가) 삭제되었습니다.';
    public static readonly DISABLE_STRING = '이(가) 비활성화되었습니다.';
    public static readonly FIND_STRING = '이(가) 조회되었습니다.';
    public static readonly NOT_FOUND_STRING = '이(가) 존재하지 않습니다.';
    public static readonly ALREADY_EXISTS_STRING = '이(가) 이미 사용중입니다.';
}
