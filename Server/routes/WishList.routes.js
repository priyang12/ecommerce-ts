import { WishlistValidation } from "@ecommerce/validation";
import express from "express";
import {
  GetWishlist,
  DeleteWishlistProduct,
  AddToWishlist,
} from "../controllers/WishlistController";
import Auth from "../middleware/AuthMiddleware";

const router = express.Router();
//Cart
router.route("/").get(Auth, GetWishlist);
router
  .route("/:id")
  .patch(Auth, AddToWishlist)
  .delete(Auth, DeleteWishlistProduct);

export default router;
