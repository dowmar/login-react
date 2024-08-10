import express from "express";
import { register, verifyEmail } from "../controllers/registerController.js";

const router = express.Router();

router.post("/", register);
router.patch("/verify-email", verifyEmail);

export default router;
