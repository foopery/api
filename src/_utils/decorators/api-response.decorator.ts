import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ApiResponseDto } from '../dto/response.dto';

export const ApiOkResponseCustom = <GenericType extends Type<unknown>>(data: GenericType) =>
    applyDecorators(
        ApiExtraModels(ApiResponseDto, data),
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ApiResponseDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(data) },
                            },
                        },
                    },
                ],
            },
        }),
    );
