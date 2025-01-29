/*
  Warnings:

  - You are about to drop the column `billing_period` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `customer` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `document` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `numbering_range_id` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `observation` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `payment_due_date` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `payment_form` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method_code` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `related_documents` on the `Bill` table. All the data in the column will be lost.
  - Added the required column `customer_email` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_name` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_phone` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "billing_period",
DROP COLUMN "customer",
DROP COLUMN "document",
DROP COLUMN "items",
DROP COLUMN "numbering_range_id",
DROP COLUMN "observation",
DROP COLUMN "payment_due_date",
DROP COLUMN "payment_form",
DROP COLUMN "payment_method_code",
DROP COLUMN "related_documents",
ADD COLUMN     "customer_email" TEXT NOT NULL,
ADD COLUMN     "customer_name" TEXT NOT NULL,
ADD COLUMN     "customer_phone" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
