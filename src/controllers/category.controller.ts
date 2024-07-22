import { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { ResponseResult } from "../model/ResponseResult";

const prisma = new PrismaClient();

export async function createCategory(req: Request, res: Response) {
  // Todo -> update database table column name to Uppercase
  try {
    await prisma.category.create({
      data: { Name: req.body.name },
    });
    return res.json(
      new ResponseResult<null>(null, true, "Category Successfully Created.")
    );
  } catch (error) {
    return res
      .status(500)
      .json(new Error(`Server Error (Create Category): ${error}`));
  }
}

export async function getAllCategory(req: Request, res: Response) {
  try {
    const result: { id: number; Name: string }[] =
      await prisma.category.findMany();

    return res.json(new ResponseResult<{ id: number; Name: string }[]>(result));
  } catch (error) {
    return res
      .status(500)
      .json(new Error(`Server Error (Get All Category): ${error}`));
  }
}
