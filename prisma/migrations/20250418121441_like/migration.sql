-- CreateTable
CREATE TABLE "like" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "postid" INTEGER,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id")
);
