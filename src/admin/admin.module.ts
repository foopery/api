import { Module } from '@nestjs/common';
import { AdminPublicService } from './_public/admin-public.service';
import { AdminPublicProcessor } from './_public/admin-public.processor';
import { AdminPublicRepository } from './_public/admin-public.repository';
import { AdminPublicController } from './_public/admin-public.controller';
import { AdminMgrProcessor } from './_management/admin-mgr.processor';
import { AdminMgrController } from './_management/admin-mgr.controller';
import { AdminMgrService } from './_management/admin-mgr.service';
import { AdminMgrRepository } from './_management/admin-mgr.repository';
import { BcryptModule } from '../_utils/modules/bcrypt/bcrypt.module';
import { AdminMgrValidator } from './_management/admin-mgr.validator';

@Module({
    imports: [BcryptModule],
    controllers: [AdminPublicController, AdminMgrController],
    providers: [AdminPublicService, AdminPublicProcessor, AdminPublicRepository, AdminMgrService, AdminMgrValidator, AdminMgrProcessor, AdminMgrRepository],
    exports: [AdminMgrProcessor, AdminMgrRepository],
})
export class AdminModule {}
