/*
  Warnings:

  - You are about to drop the `Factura` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Factura";

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "document" TEXT,
    "numbering_range_id" INTEGER,
    "reference_code" TEXT NOT NULL,
    "observation" TEXT,
    "payment_form" JSONB,
    "payment_due_date" TIMESTAMP(3),
    "payment_method_code" INTEGER,
    "related_documents" JSONB,
    "billing_period" JSONB,
    "customer" JSONB NOT NULL,
    "items" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);
