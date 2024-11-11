import { ModuleRef, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as nodeCloudflare from 'node_cloudflare';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggerService } from './_utils/modules/logger/logger.service';
import { AppNodeEnv } from './_utils/types/app-node-env.type';
import { Swagger } from './_utils/swagger/swagger';
import { Config } from './config';

export let globalModuleRef: ModuleRef;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
    });

    globalModuleRef = app.get(ModuleRef);

    app.useLogger(app.get(LoggerService));
    app.useBodyParser('json', { limit: '5mb' });

    const configService = app.get(ConfigService);

    const nodeEnv = configService.get<AppNodeEnv>('NODE_ENV', 'local');
    if (nodeEnv !== 'local') app.use(helmet());

    // CORS 설정
    app.enableCors();

    // 스웨거 문서 설정
    new Swagger(app, Config.APP_NAME, Config.IS_SWAGGER);

    app.set('trust proxy', true);

    // 서버 실행
    await app.listen(configService.get<number>('PORT')!, '0.0.0.0');
}

nodeCloudflare.load((err, fsErr) => bootstrap());
