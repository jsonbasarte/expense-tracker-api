import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
}
