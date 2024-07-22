import { PrismaClient } from "@prisma/client";
import { WalletRequestModel } from "../model/request/wallet-request.model";

const prisma = new PrismaClient();

export async function createWallet(params: WalletRequestModel) {
  await prisma.wallet.create({
    data: { ...params },
  });
}
