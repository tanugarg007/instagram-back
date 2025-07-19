/*
  Warnings:

  - A unique constraint covering the columns `[postid]` on the table `like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "like_postid_key" ON "like"("postid");

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
