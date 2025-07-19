/*
  Warnings:

  - You are about to drop the column `postId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_postid_fkey";

-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_userId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "postId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "userId";
