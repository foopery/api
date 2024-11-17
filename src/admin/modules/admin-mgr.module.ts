import { Module } from '@nestjs/common';
import { AdminMgrController } from '../controllers/admin-mgr.controller';
import { AdminMgrPresenter } from '../presenters/admin-mgr.presenter';
import { AdminMgrService } from '../services/admin-mgr.service';
import { AdminMgrRepository } from '../repositories/admin-mgr.repository';
import { BcryptModule } from '../../_utils/modules/bcrypt/bcrypt.module';
import * as Joi from 'joi';
import { EnvModule } from '../../_utils/modules/env/env.module';

@Module({
    imports: [
        BcryptModule,
        EnvModule.forRoot({
            validationSchema: Joi.object({
                ADMIN_PASSWORD_SECRET_KEY: Joi.string().required(),
                ADMIN_PASSWORD_SALT: Joi.number().required(),
                INIT_ADMIN_ID: Joi.string().required(),
                INIT_ADMIN_PASSWORD: Joi.string().required(),
            }),
        }),
    ],
    controllers: [AdminMgrController],
    providers: [AdminMgrPresenter, AdminMgrService, AdminMgrRepository],
    exports: [AdminMgrService],
})
export class AdminMgrModule {}
