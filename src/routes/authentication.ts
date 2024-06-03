import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authentication";
import { body } from "express-validator";
import fieldValidator from "../middleware/fieldValidator";

const authRoute = Router();

const validator = [
  body("username").notEmpty(),
  body("email").isEmail(),
  body("password").notEmpty(),
  fieldValidator,
];

authRoute.route("/register").post(validator, registerUser);
authRoute.route("/login").post(loginUser);

export default authRoute;
