import express from "express";
import { fetchOrders, inputOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", inputOrders);
router.get("/", fetchOrders);

export default router;
