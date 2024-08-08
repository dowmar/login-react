import express from "express";
import {
  getFoods,
  getFood,
  getFoodsByCategory,
} from "../controllers/foodController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.get("/", getFoods);
router.get("/:id", getFood);
router.get("/category/:categoryId", getFoodsByCategory);

export default router;
