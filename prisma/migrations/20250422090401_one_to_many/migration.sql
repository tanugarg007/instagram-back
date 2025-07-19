/*
  Warnings:

  - Added the required column `UserId` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "UserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
