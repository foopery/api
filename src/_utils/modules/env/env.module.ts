import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { EnvService } from './env.service';

@Module({
    imports: [ConfigModule.forRoot({ envFilePath: `envs/.${process.env.NODE_ENV}.env` })],
    providers: [EnvService],
    exports: [EnvService],
})
export class EnvModule {
    static forRoot(options: Omit<ConfigModuleOptions, 'envFilePath'>): DynamicModule {
        return {
            imports: [ConfigModule.forRoot({ envFilePath: `envs/.${process.env.NODE_ENV}.env`, ...options })],
            providers: [EnvService],
            exports: [EnvService],
            module: EnvModule,
        };
    }
}
