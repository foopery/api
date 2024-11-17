import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMgrPresenter } from './presenters/auth-mgr.presenter';
import { AuthMgrController } from './controllers/auth-mgr.controller';
import { AuthMgrService } from './services/auth-mgr.service';
import { AdminModule } from '../admin/admin.module';
import { BcryptModule } from '../_utils/modules/bcrypt/bcrypt.module';
import { AuthMgrModule } from './modules/auth-mgr.module';

@Module({
    imports: [AuthMgrModule],
    controllers: [],
    providers: [],
})
export class AuthModule {}
