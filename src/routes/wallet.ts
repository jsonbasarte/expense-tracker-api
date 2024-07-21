import { Router } from "express";
import { createWallet, getWallet } from "../controllers/wallet.controller";
import { body } from "express-validator";
import authMiddleware from "../middleware/authMiddleware";
import fieldValidator from "../middleware/fieldValidator";

const validator = [
  body("name").notEmpty(),
  body("walletType").notEmpty().isNumeric(),
  body("balance").notEmpty().isNumeric().isDecimal(),
  body("userId").notEmpty(),
  fieldValidator,
];

const walletRoute = Router();

walletRoute
  .route("/")
  .post(authMiddleware, validator, createWallet)
  .get(authMiddleware, getWallet);

export default walletRoute;
