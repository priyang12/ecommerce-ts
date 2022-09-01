import express from "express";

import {
  addOrderItems,
  getUserOrders,
  getOrder,
  getAllOrders,
  UpdateOrder,
  DeleteOrder,
} from "../controllers/OrderController";
import Auth from "../middleware/AuthMiddleware";
import Admin from "../middleware/AdminMiddleware";
import ZodMiddleware from "../middleware/ZodMiddleware";
import { CreateOrder } from "@ecommerce/validation";

const router = express.Router();
router
  .route("/")
  .post(Auth, ZodMiddleware(CreateOrder), addOrderItems)
  .get(Auth, getUserOrders);

router
  .route("/order/:id")
  .get(Auth, getOrder)
  .put(Admin, UpdateOrder)
  .delete(Admin, DeleteOrder);

//Admin
router.route("/all").get(Admin, getAllOrders);
export default router;
