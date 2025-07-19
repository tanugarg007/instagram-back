-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "following" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);
