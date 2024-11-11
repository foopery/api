import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';

export class Swagger {
    private readonly app: INestApplication;
    private readonly configService: ConfigService;
    private readonly projectName: string;
    private readonly isEnabled: boolean;

    constructor(app: INestApplication, projectName: string, isEnabled: boolean) {
        this.projectName = projectName;
        this.app = app;
        this.isEnabled = isEnabled;
        this.configService = this.app.get(ConfigService);
        if (this.isEnabled) this.enabled();
    }

    public enabled(): void {
        this.app.use(
            ['/api-docs'],
            basicAuth({
                users: { [this.configService.get<string>('SWAGGER_ID')!]: this.configService.get<string>('SWAGGER_PW')! },
                challenge: true,
            }),
        );

        this.setup();
    }

    public setup(): void {
        const options = new DocumentBuilder()
            .setTitle(this.projectName + ' API Docs')
            .setDescription('#### Description \n\n - 토큰 인증이 필요한 API의 경우 설명이 추가됩니다.')
            .setVersion('Development')
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'Bearer',
                    name: 'authorization',
                    description: 'Bearer accessToken',
                    in: 'header',
                },
                'accessToken',
            )
            .build();

        const document = SwaggerModule.createDocument(this.app, options, {});

        SwaggerModule.setup('api-docs', this.app, document, {
            swaggerOptions: {
                operationsSorter: 'alpha',
                // defaultModelsExpandDepth: -1,
                persistAuthorization: true,
            },
        });
    }
}
