import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { IUserReponse } from "../model/response/user-response.model";
import { IPaginationResult } from "../interfaces/IPaginationResult";
import { ResponseResult } from "../model/ResponseResult";

const prisma = new PrismaClient();

export async function getAllUsers(req: Request, res: Response) {
  try {
    const response = await prisma.user.findMany();

    const result: IUserReponse[] = response.map((prop) => {
      return {
        id: Number(prop.id),
        username: prop.username,
        email: prop.email,
      };
    });

    const paginatedResult: IPaginationResult<IUserReponse[]> = {
      data: result,
      currentPage: 1,
      totalPage: 1,
      rowsPerPage: 1,
    };
    return res.json(new ResponseResult(paginatedResult));
  } catch (err) {
    return res.status(500).send(`Server Error (Get All Users): ${err}`);
  }
}
