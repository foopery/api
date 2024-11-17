import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiDisableGuard } from '../guard/api-disable.guard';

export function ApiDisabled() {
    return applyDecorators(
        ApiOperation({
            deprecated: true,
        }),
        UseGuards(ApiDisableGuard),
    );
}
