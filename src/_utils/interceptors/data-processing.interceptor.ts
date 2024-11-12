import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as dayjs from 'dayjs';
import { Config } from '../../config';

@Injectable()
export class DataProcessingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(value => {
                const responseData = value;
                const result = responseData.data;

                searchProperties(result);

                function searchProperties(obj) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            if (obj[key] instanceof Object && !(obj[key] instanceof Date)) {
                                if (Array.isArray(obj[key])) {
                                    // 배열 내부의 객체 검사
                                    for (let i = 0; i < obj[key].length; i++) {
                                        if (searchProperties(obj[key][i])) {
                                            return true;
                                        }
                                    }
                                } else {
                                    // 재귀 호출
                                    if (searchProperties(obj[key])) {
                                        return true;
                                    }
                                }
                            } else {
                                if (
                                    (Config['APP_DATA_PROCESSING_DATE_FORMAT'] && obj[key] instanceof Date) ||
                                    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(obj[key])
                                ) {
                                    obj[key] = dayjs(obj[key]).format(Config.APP_DATA_PROCESSING_DATE_FORMAT);
                                }
                                if ((Config.APP_DATA_PROCESSING_EXPOSE as readonly string[]).includes(key)) delete obj[key];
                            }
                        }
                    }
                    return false;
                }

                return responseData;
            }),
        );
    }
}
