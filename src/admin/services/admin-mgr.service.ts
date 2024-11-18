import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AdminMgrRepository } from '../repositories/admin-mgr.repository';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';
import { AdminConstant } from '../admin.constant';
import { AdminStatus } from '../enums/admin.status.enum';
import { AdminMgrCreateDto } from '../dto/admin-mgr.create.dto';
import { AdminMgrUpdateDto } from '../dto/admin-mgr.update.dto';
import { AdminMgrFindListDto } from '../dto/admin-mgr.find-list.dto';
import { EnvService } from '../../_utils/modules/env/env.service';
import { AdminRole } from '../enums/admin.role.enum';
import { LoggerService } from '../../_utils/modules/logger/logger.service';

@Injectable()
export class AdminMgrService {
    constructor(
        private logger: LoggerService,
        private repository: AdminMgrRepository,
        private bcryptService: BcryptService,
        private envService: EnvService,
    ) {}

    /** @description 초기 설정
     * 관리자가 없을 경우 초기 관리자를 생성합니다.
     * */
    async onApplicationBootstrap() {
        const count = await this.repository.count();

        if (count === 0) {
            this.logger.log('관리자가 존재하지 않아 초기 관리자를 생성합니다.', this.constructor.name);
            await this.create({
                loginId: this.envService.get('INIT_ADMIN_ID') as string,
                password: this.envService.get('INIT_ADMIN_PASSWORD') as string,
                name: '초기 관리자',
                status: AdminStatus.ENABLED,
                role: AdminRole.SUPER_ADMIN,
            });
        }
    }

    /**
     * @apiMethod create
     * @description 생성
     * */
    async create(data: AdminMgrCreateDto) {
        await this.throwIfLoginIdExists(data.loginId as string);
        data.password = await this.hashPassword(data.password as string);
        return this.repository.create(data);
    }

    /**
     * @apiMethod update
     * @description 수정
     * */
    async update(id: number, data: AdminMgrUpdateDto) {
        await this.findOrThrowNotFound(id);
        if (data.password) data.password = await this.hashPassword(data.password);
        return this.repository.update(id, data);
    }

    /**
     * @apiMethod find
     * @description 조회
     * */
    async find(id: number) {
        return this.findOrThrowNotFound(id);
    }

    /**
     * @apiMethod findList
     * @description 목록 조회
     * */
    async findList(data: AdminMgrFindListDto) {
        return this.repository.findList(data);
    }

    /** @description 관리자 상태가 비활성화된 경우 오류를 반환 */
    async findOrThrowNotAllowedStatus(id: number) {
        const resource = await this.findOrThrowNotFound(id);
        if (resource.status === AdminStatus.DISABLED) throw new ConflictException(AdminConstant.BAD_STATUS_MESSAGE);
        return resource;
    }

    /**
     * @description 관리자 조회 (없을 경우 오류 반환)
     * */
    async findOrThrowNotFound(id: number) {
        const resource = await this.repository.findUnique(id);
        if (!resource) throw new NotFoundException(AdminConstant.NOT_FOUND_MESSAGE);
        return resource;
    }

    /**
     * @description 마지막 로그인 시간 업데이트
     * */
    async updateLastLoginAt(id: number) {
        await this.findOrThrowNotFound(id);
        return this.repository.updateLastLoginAt(id);
    }

    /**
     * @description 중복 로그인 아이디가 있을 경우 오류 반환
     * */
    async throwIfLoginIdExists(loginId: string) {
        const loginIdCount = await this.repository.countByLoginId(loginId);
        if (loginIdCount) throw new ConflictException(AdminConstant.EXISTS_LOGIN_ID_MESSAGE);
    }

    /** @description 로그인 아이디로 관리자 조회 및 없을 경우 오류 반환 */
    async findByLoginIdOrThrowForAuth(loginId: string) {
        const resource = await this.repository.findFirstByLoginId(loginId);
        if (!resource) throw new UnauthorizedException(AdminConstant.LOGIN_ID_MISMATCH_MESSAGE);
        return resource;
    }

    /** 패스워드 암호화 */
    async hashPassword(password: string) {
        return this.bcryptService.hash(password, {
            secretKey: this.envService.get('ADMIN_PASSWORD_SECRET_KEY') as string,
            salt: this.envService.get('ADMIN_PASSWORD_SALT') as number,
        });
    }
}
