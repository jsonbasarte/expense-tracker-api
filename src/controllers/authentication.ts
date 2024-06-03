import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import { RegisterUserRequestModel } from "../model/AuthModel";

const prisma = new PrismaClient();

const saltRounds = 8;

export async function registerUser(req: Request, res: Response) {
  const { email, username, password } = req.body;

  try {
    const emailExist =  await prisma.user.findUnique({
      where: { email },
    });

    if (emailExist)
      return res.json({ success: false, message: "Email already exist." });

    // TODO enforce strong password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      } as RegisterUserRequestModel,
    });

    return res.json({
      success: true,
      message: "User successfully registered!",
    });
  } catch (err) {
    res.status(500).send(`Registration Error: ${err}`);
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid User" });
    }

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = generateToken(user.id, email);

    return res.json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).send(`Login error: ${err}`);
  }
}
