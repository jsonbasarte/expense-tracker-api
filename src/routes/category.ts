import { Router } from "express";
import {
  createCategory,
  getAllCategory,
} from "../controllers/category.controller";
import { body } from "express-validator";
import fieldValidator from "../middleware/fieldValidator";
import authMiddleware from "../middleware/authMiddleware";

const categoryRoute = Router();

const validator = [body("name").notEmpty(), fieldValidator];

categoryRoute
  .route("/")
  .post(validator, authMiddleware, createCategory)
  .get(getAllCategory);

export default categoryRoute;
