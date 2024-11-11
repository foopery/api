import { ApiMetaInterface } from '../interfaces/api-meta.interface';

export function apiResponse<T>(message: string): { message: string; data: null };
export function apiResponse<T>(message: string, data: T | null): { message: string; data: T };
export function apiResponse<T>(message: string, data: T | null, meta: ApiMetaInterface): { message: string; data: T; meta: ApiMetaInterface };
export function apiResponse<T>(message: string, data?: T | null, meta?: ApiMetaInterface) {
    /** 데이터 값이 없을 경우 null */
    if (data === undefined) data = null;

    /** 메타 데이터가 없을 경우 반환 케이스 */
    if (!meta) return { code: 0, message, data };

    /** 전체 반환 케이스 */
    return { message, data, meta };
}
