import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IUserReponse } from "../model/response/user-response.model";

const prisma = new PrismaClient();

export async function getAllUsers(req: Request, res: Response) {
  const response = await prisma.user.findMany();
  const result: IUserReponse[] = response.map((prop) => {
    return { id: Number(prop.id), username: prop.username, email: prop.email };
  });
  return res.json({
    success: true,
    data: result,
  });
}
