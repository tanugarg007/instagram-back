-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
