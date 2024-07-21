import { PrismaClient } from "@prisma/client";
import { WalletRequestModel } from "../model/request/wallet-request.model";

const prisma = new PrismaClient();

export async function createWallet(
  params: WalletRequestModel
): Promise<boolean> {
  try {
    console.log("balance: ", params);
    await prisma.wallet.create({
      data: { ...params },
    });

    return true;
  } catch (err) {
    console.log("ERROR CREATE WALLET:", err);
    return false;
  }
}
