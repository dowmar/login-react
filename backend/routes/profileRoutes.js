import express from "express";
import {
  updateUserName,
  updatePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.patch("/edit-name", updateUserName);
router.patch("/edit-password", updatePassword);

export default router;
