/*
  Warnings:

  - Added the required column `name` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletType` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "walletType" INTEGER NOT NULL;
