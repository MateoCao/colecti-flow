-- CreateTable
CREATE TABLE "Driver" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "startShift" TIMESTAMP(3) NOT NULL,
    "endShift" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);
