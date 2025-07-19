/*
  Warnings:

  - You are about to drop the column `username` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `like` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postid]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `postid` on table `like` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "username",
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "like" DROP COLUMN "userId",
ALTER COLUMN "postid" SET NOT NULL;

-- AlterTable
ALTER TABLE "post" DROP COLUMN "username";

-- CreateIndex
CREATE UNIQUE INDEX "like_postid_key" ON "like"("postid");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
