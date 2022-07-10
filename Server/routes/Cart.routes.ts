import express from "express";
const router = express.Router();

const {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
} = require("../controllers/CartController");

import Auth from "../middleware/AuthMiddleware";
import ZodMiddlware from "../middleware/ZodMiddleware";
import { CartValidation } from "@ecommerce/validation";

const { CartPost } = CartValidation;

//Cart
router
  .route("/")
  .post(Auth, ZodMiddlware(CartPost), AddToCart)
  .get(Auth, GetCartProducts);
router.route("/:id").delete(Auth, DeleteCartProduct);

export default router;
