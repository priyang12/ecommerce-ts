import express from "express";
import {
  GetAllProducts,
  GetProductByID,
  GetTopProducts,
} from "../controllers/ProductController";

const router = express.Router();

//Product
router.route("/").get(GetAllProducts);
router.route("/top").get(GetTopProducts);
router.route("/product/:id").get(GetProductByID);

export default router;
