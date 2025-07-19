-- CreateTable
CREATE TABLE "login" (
    "id" SERIAL NOT NULL,
    "phonenumber" INTEGER NOT NULL,
    "passowrd" TEXT NOT NULL,

    CONSTRAINT "login_pkey" PRIMARY KEY ("id")
);
