import { Router } from "express";
import { getAllUsers } from "../controllers/user";
import authMiddleware from "../middleware/authMiddleware";

const userRoute = Router();

userRoute.route("/").get(authMiddleware, getAllUsers);

export default userRoute;
