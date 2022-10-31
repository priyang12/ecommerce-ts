import express from "express";

import {
  addOrderItems,
  getUserOrders,
  getOrder,
} from "../controllers/OrderController";
import Auth from "../middleware/AuthMiddleware";
import ZodMiddleware from "../middleware/ZodMiddleware";
import { CreateOrder } from "@ecommerce/validation";

const router = express.Router();
router
  .route("/")
  .post(Auth, ZodMiddleware(CreateOrder), addOrderItems)
  .get(Auth, getUserOrders);

router.route("/order/:id").get(Auth, getOrder);

export default router;
