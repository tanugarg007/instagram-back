/*
  Warnings:

  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_postid_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_UserId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "UserId";
