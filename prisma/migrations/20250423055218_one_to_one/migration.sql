/*
  Warnings:

  - A unique constraint covering the columns `[userid]` on the table `like` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userid` on table `like` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "like" ALTER COLUMN "userid" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "like_userid_key" ON "like"("userid");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
