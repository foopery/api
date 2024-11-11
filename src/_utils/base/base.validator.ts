import { NotFoundException } from '@nestjs/common';
import { BaseConstant } from './base.constant';

export class BaseValidator {
    private readonly key: string;
    constructor(key: string) {
        this.key = key;
    }

    public throwIfInvalidNotFound<T>(resource: T): asserts resource is NonNullable<T> {
        if (!resource) throw new NotFoundException(this.key + BaseConstant.NOT_FOUND_STRING);
    }
}
