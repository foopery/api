import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import * as crypto from 'node:crypto';
import { DayjsModule } from '@inhanbyeol/nestjs-dayjs';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './_utils/modules/database/database.module';
import { LoggerModule } from './_utils/modules/logger/logger.module';
import { BcryptModule } from './_utils/modules/bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { ValidationPipe } from './_utils/pipes/validation.pipe';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ExceptionFilter } from './_utils/filters/exception.filter';
import { DataProcessingInterceptor } from './_utils/interceptors/data-processing.interceptor';
import { HttpLoggerInterceptor } from './_utils/interceptors/http-logger.interceptor';
import { AccountMiddleware } from './_utils/middlewares/account.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule,
        ConfigModule.forRoot({ isGlobal: true }),
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: true,
                generateId: true,
                idGenerator: () => crypto.randomBytes(10).toString('hex'),
                setup: (cls, req) => {
                    cls.set('now', Date.now());
                },
            },
        }),
        BcryptModule,
        LoggerModule,
        DayjsModule.forRoot({ defaultTimezone: 'Asia/Seoul', isGlobal: true }),
        DatabaseModule,
        AuthModule,
        AdminModule,
    ],
    providers: [
        { provide: APP_PIPE, useClass: ValidationPipe },
        { provide: APP_FILTER, useClass: ExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: DataProcessingInterceptor },
        { provide: APP_INTERCEPTOR, useClass: HttpLoggerInterceptor },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ClsMiddleware).forRoutes('*');
        consumer.apply(AccountMiddleware).forRoutes('*');
    }
}
