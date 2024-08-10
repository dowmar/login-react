import express from "express";
import {
  getUserLog,
  getDashboardStats,
} from "../controllers/dashboardController.js";
const router = express.Router();

// router.patch("/edit-name", updateUserName);
// router.patch("/edit-password", updatePassword);
router.get("/logs", getUserLog);
router.get("/stats", getDashboardStats);

export default router;
