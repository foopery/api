import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error' | 'info' | 'warn'> implements OnModuleInit {
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
                {
                    emit: 'event',
                    level: 'info',
                },
                {
                    emit: 'event',
                    level: 'warn',
                },
            ],
        });
    }

    async onModuleInit(): Promise<void> {
        await this.$connect();
    }
}
