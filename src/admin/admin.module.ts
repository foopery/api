import { Module } from '@nestjs/common';
import { AdminPublicService } from './services/admin-public.service';
import { AdminPublicProcessor } from './processors/admin-public.processor';
import { AdminPublicRepository } from './repositories/admin-public.repository';
import { AdminPublicController } from './controllers/admin-public.controller';
import { AdminMgrProcessor } from './processors/admin-mgr.processor';
import { AdminMgrController } from './controllers/admin-mgr.controller';
import { AdminMgrService } from './services/admin-mgr.service';
import { AdminMgrRepository } from './repositories/admin-mgr.repository';
import { BcryptModule } from '../_utils/modules/bcrypt/bcrypt.module';

@Module({
    imports: [BcryptModule],
    controllers: [AdminPublicController, AdminMgrController],
    providers: [AdminPublicService, AdminPublicProcessor, AdminPublicRepository, AdminMgrService, AdminMgrProcessor, AdminMgrRepository],
    exports: [AdminMgrProcessor],
})
export class AdminModule {}
