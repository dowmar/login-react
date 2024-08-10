import express from "express";
import {
  registerEmail,
  registerSocial,
  verifyEmail,
  resendEmail,
} from "../controllers/registerController.js";

const router = express.Router();

router.post("/", registerEmail);
router.post("/social", registerSocial);
router.patch("/verify-email", verifyEmail);
router.post("/resend-email", resendEmail);

export default router;
