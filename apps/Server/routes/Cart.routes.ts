import express from "express";
import { CartPost } from "../validation";
import Auth from "../middleware/AuthMiddleware";
import ZodMiddleware from "../middleware/ZodMiddleware";
const {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
} = require("../controllers/CartController");

const router = express.Router();
//Cart
router
  .route("/")
  .post(Auth, ZodMiddleware(CartPost), AddToCart)
  .get(Auth, GetCartProducts);
router.route("/:id").delete(Auth, DeleteCartProduct);

export default router;
