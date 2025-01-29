/*
  Warnings:

  - You are about to drop the column `customer_email` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `customer_name` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `customer_phone` on the `Bill` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Bill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "customer_email",
DROP COLUMN "customer_name",
DROP COLUMN "customer_phone",
DROP COLUMN "total";
