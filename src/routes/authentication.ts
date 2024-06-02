import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authentication";

const authRoute = Router();

authRoute.route("/").post(registerUser);
authRoute.route("/login").post(loginUser);

export default authRoute;
