import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function ApiController(apiPath: string) {
    return applyDecorators(Controller(apiPath), ApiTags(apiPath));
}
