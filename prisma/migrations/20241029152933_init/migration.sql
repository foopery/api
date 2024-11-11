-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "state" SMALLINT NOT NULL,
    "role" SMALLINT NOT NULL,
    "o_auth_id" VARCHAR,
    "login_id" VARCHAR,
    "password" VARCHAR,
    "name" VARCHAR,
    "nickname" VARCHAR,
    "profile_image_url" VARCHAR,
    "created_at" BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM clock_timestamp()) * 1000)::bigint,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
