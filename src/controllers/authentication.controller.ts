import { Request, Response } from "express";
import * as authService from "../services/authentication.service";

export async function registerUser(req: Request, res: Response) {
  try {
    const result = await authService.resgister(req.body);
    return res.json(result);
  } catch (err) {
    res.status(500).send(`Register Server Error: ${err}`);
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const result = await authService.login(req.body);
    return res.json(result);
  } catch (err) {
    res.status(500).send(`Login Server Error ${err}`);
  }
}
