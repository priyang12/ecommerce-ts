import express from "express";
const router = express.Router();

const {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
} = require("../controllers/CartController");

import Auth from "../middleware/AuthMiddleware";

//Cart
router.route("/").post(Auth, AddToCart).get(Auth, GetCartProducts);
router.route("/:id").delete(Auth, DeleteCartProduct);

export default router;
