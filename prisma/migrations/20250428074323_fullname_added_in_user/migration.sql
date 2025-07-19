/*
  Warnings:

  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "fullname" TEXT NOT NULL DEFAULT '';
