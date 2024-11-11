import { ValidationPipe as NestValidationPipe } from '@nestjs/common';

export class ValidationPipe extends NestValidationPipe {
    constructor() {
        super({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            enableDebugMessages: true,
        });
    }
}
