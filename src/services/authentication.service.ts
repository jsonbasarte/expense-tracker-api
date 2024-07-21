import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { RegisterUserRequestModel } from "../model/request/auth-request.model";
import { ResponseResult } from "../model/ResponseResult";
import generateToken from "../utils/generateToken";

const prisma = new PrismaClient();
const saltRounds = 8;

interface IResult extends ResponseResult<string[]> {}

export async function resgister(params: RegisterUserRequestModel) {
  const { email, username, password } = params;
  const emailExist = await prisma.user.findUnique({
    where: { email },
  });

  if (emailExist) return { success: false, message: "Email already exist." };

  // TODO enforce strong password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    } as RegisterUserRequestModel,
  });

  return {
    success: true,
    message: "User successfully registered!",
  };
}

export async function login(params: { email: string; password: string }) {
  const { email, password } = params;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return { error: "Invalid User" };

  const isPasswordMatch = await bcrypt.compareSync(password, user.password);

  if (!isPasswordMatch) {
    return { error: "Invalid Password" };
  }

  const token = generateToken(user.id, email);

  return { success: true, token };
}
