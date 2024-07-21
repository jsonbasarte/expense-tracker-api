/*
  Warnings:

  - You are about to drop the column `Balance` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `balance` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "Balance",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;
