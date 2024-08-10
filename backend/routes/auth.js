import express from "express";
import {
  handleEmailLogin,
  handleSocialLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/", handleEmailLogin);
router.post("/social", handleSocialLogin);

export default router;
