import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as walletService from "../services/wallet.service";
import { WalletRequestModel } from "../model/request/wallet-request.model";

const prisma = new PrismaClient();

export async function createWallet(req: Request, res: Response) {
  try {
    const params: WalletRequestModel = req.body;
    const response = walletService.createWallet(params);

    return res.json({
      success: true,
      message: "Wallet Successfully Created",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to create wallet",
    });
  }
}

export async function getWallet(req: Request, res: Response) {
  try {
    const result = await prisma.wallet.findMany();
    return res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.log("Unable to get wallet: ", err);
  }
}
