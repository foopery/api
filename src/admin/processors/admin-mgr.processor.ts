import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminMgrRepository } from '../repositories/admin-mgr.repository';
import { AdminMgrCreateInterface } from '../interfaces/admin-mgr.create.interface';
import { LoggerService } from '../../_utils/modules/logger/logger.service';
import { BcryptService } from '../../_utils/modules/bcrypt/bcrypt.service';
import { AdminConstant } from '../admin.constant';
import { AdminMgrFindListInterface } from '../interfaces/admin-mgr.find-list.interface';
import { AdminMgrUpdateDto } from '../dto/admin-mgr.update.dto';
import { AdminMgrUpdateInterface } from '../interfaces/admin-mgr.update.interface';

@Injectable()
export class AdminMgrProcessor {
    constructor(
        private logger: LoggerService,
        private repository: AdminMgrRepository,
        private bcryptService: BcryptService,
    ) {}

    /**
     * @apiMethod create
     * @description 생성
     * */
    async create(data: AdminMgrCreateInterface) {
        await this.throwIfLoginIdExists(data.loginId);
        data.password = await this.bcryptService.hashPassword(data.password);
        return this.repository.create(data);
    }

    /**
     * @apiMethod update
     * @description 수정
     * */
    async update(id: number, data: AdminMgrUpdateInterface) {
        await this.findOrThrowNotFound(id);
        return this.repository.update(id, data);
    }

    /**
     * @apiMethod findList
     * @description 목록 조회
     * */
    async findList(data: AdminMgrFindListInterface) {
        return this.repository.findList(data);
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
}
