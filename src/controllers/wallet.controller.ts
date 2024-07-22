import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as walletService from "../services/wallet.service";
import {
  WalletRequestModel,
  WalletResponseModel,
} from "../model/request/wallet-request.model";
import { ResponseResult } from "../model/ResponseResult";

const prisma = new PrismaClient();

export async function createWallet(req: Request, res: Response) {
  try {
    const params: WalletRequestModel = req.body;
    await walletService.createWallet(params);

    return res.json(
      new ResponseResult<null>(null, true, "Wallet Successfully Created")
    );
  } catch (err) {
    return res.status(500).send(`Server Error (Create Wallet): ${err}`);
  }
}

export async function getWallet(req: Request, res: Response) {
  try {
    const result = await prisma.wallet.findMany();

    // TODO -> fix balance type decimal
    const response: WalletResponseModel[] = result.map((prop) => {
      return {
        id: prop.id,
        name: prop.name,
        balance: prop.balance,
        walletType: prop.walletType,
      };
    });
    return res.json(new ResponseResult<WalletResponseModel[]>(response, true));
  } catch (err) {
    return res.status(500).send(`Server Error (Get Wallet): ${err}`);
  }
}
