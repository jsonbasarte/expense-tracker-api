import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

async function getUsers() {
  // await prisma.user.create({
  //   data: {
  //     username: "shionj03",
  //     email: 'shionj03@prisma.io',
  //   },
  // })
  // await prisma.category.create({
  //   data: {
  //     Name: "Snacks",
  //   },
  // })
  const users = await prisma.user.findMany();
  const wallet = await prisma.wallet.findMany();
  const category = await prisma.category.findMany();
  console.log("users: ", users);
  console.log("wallet: ", wallet);
  console.log("category: ", category);
}

app.get("/", (req: Request, res: Response) => {
  getUsers()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
