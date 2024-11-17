import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { EnvModule } from '../../_utils/modules/env/env.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthMgrController } from '../controllers/auth-mgr.controller';
import { AuthMgrService } from '../services/auth-mgr.service';
import { BcryptModule } from '../../_utils/modules/bcrypt/bcrypt.module';
import { AdminMgrModule } from '../../admin/modules/admin-mgr.module';
import { AuthMgrPresenter } from '../presenters/auth-mgr.presenter';

@Module({
    imports: [
        AdminMgrModule,
        BcryptModule,
        JwtModule,
        EnvModule.forRoot({
            validationSchema: Joi.object({
                ADMIN_ACCESS_TOKEN_EXPIRES_IN: Joi.string().required(),
                ADMIN_ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),
                ADMIN_PASSWORD_SECRET_KEY: Joi.string().required(),
                ADMIN_PASSWORD_SALT: Joi.number().required(),
            }),
        }),
    ],
    controllers: [AuthMgrController],
    providers: [AuthMgrPresenter, AuthMgrService],
    exports: [],
})
export class AuthMgrModule {}
