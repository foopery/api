/*
  Warnings:

  - You are about to drop the column `nickname` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `o_auth_id` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `admin` table. All the data in the column will be lost.
  - The `created_at` column on the `admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `status` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admin" DROP COLUMN "nickname",
DROP COLUMN "o_auth_id",
DROP COLUMN "state",
ADD COLUMN     "birth_date" DATE,
ADD COLUMN     "deleted_at" TIMESTAMPTZ(3),
ADD COLUMN     "status" SMALLINT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3),
DROP COLUMN "created_at",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
