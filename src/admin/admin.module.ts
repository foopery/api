import { Module } from '@nestjs/common';
import { AdminMgrModule } from './modules/admin-mgr.module';

@Module({
    imports: [AdminMgrModule],
    controllers: [],
    providers: [],
    exports: [],
})
export class AdminModule {}
