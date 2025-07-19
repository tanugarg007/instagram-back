-- AlterTable
ALTER TABLE "user" ADD COLUMN     "visibility" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followers_fkey" FOREIGN KEY ("followers") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
