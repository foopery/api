import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation } from '@nestjs/swagger';

export function ApiDetail(name: string, options?: { isAuth?: boolean; desc?: string }) {
    return applyDecorators(
        ApiOperation({
            summary: name + ' API',
            description: options?.isAuth
                ? '- 해당 API는 <b>토큰 인증</b>이 필요합니다.' + (options?.desc ? '\n\n - ' + options?.desc : '')
                : options?.desc && '- ' + options?.desc,
        }),
        options?.isAuth ? ApiBearerAuth('accessToken') : function () {},
    );
}
