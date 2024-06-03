import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  return res.json({
    success: true,
    data: users,
  });
}
