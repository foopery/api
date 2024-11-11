import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthMgrService } from './_management/auth-mgr.service';
import { AuthMgrController } from './_management/auth-mgr.controller';
import { AuthMgrProcessor } from './_management/auth-mgr.processor';
import { AdminModule } from '../admin/admin.module';
import { BcryptModule } from '../_utils/modules/bcrypt/bcrypt.module';
import { AuthCoreValidator } from './_core/auth-core.validator';

@Module({
    imports: [JwtModule, AdminModule, BcryptModule],
    controllers: [AuthMgrController],
    providers: [AuthCoreValidator, AuthMgrService, AuthMgrProcessor],
})
export class AuthModule {}
