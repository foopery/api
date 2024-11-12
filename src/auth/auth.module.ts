import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMgrService } from './services/auth-mgr.service';
import { AuthMgrController } from './controllers/auth-mgr.controller';
import { AuthMgrProcessor } from './processors/auth-mgr.processor';
import { AdminModule } from '../admin/admin.module';
import { BcryptModule } from '../_utils/modules/bcrypt/bcrypt.module';

@Module({
    imports: [JwtModule, AdminModule, BcryptModule],
    controllers: [AuthMgrController],
    providers: [AuthMgrService, AuthMgrProcessor],
})
export class AuthModule {}
