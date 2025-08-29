-- CreateTable
CREATE TABLE "public"."Contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneno" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);
