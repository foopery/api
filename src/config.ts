export class Config {
    /** Default */
    static readonly APP_NAME = 'Foopery';
    static readonly AUTH_CODE_EXPIRATION_MINUTES = 30;

    /** Swagger */
    static readonly IS_SWAGGER = true;

    /** Data Processing */
    static readonly APP_DATA_PROCESSING_EXPOSE = ['password', 'ci'] as const;

    /** Multiple Token Option */
    static readonly IS_ADMIN_MULTIPLE_TOKEN = false;
    static readonly IS_USER_MULTIPLE_TOKEN = false;

    /** Develop Only Logger Option */
    static readonly IS_PRISMA_QUERY_LOG_PRINT = false;
    static readonly IS_PRISMA_ERROR_LOG_PRINT = false;
    static readonly IS_PRISMA_INFO_LOG_PRINT = false;
    static readonly IS_PRISMA_WARN_LOG_PRINT = false;
}
