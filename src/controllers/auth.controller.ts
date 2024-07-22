import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function registerUser(req: Request, res: Response) {
  try {
    const result = await authService.resgister(req.body);
    return res.json(result);
  } catch (err) {
    res.status(500).send(`Server Error (Register): ${err}`);
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (err) {
    res.status(500).send(`Server Error (Login): ${err}`);
  }
}
