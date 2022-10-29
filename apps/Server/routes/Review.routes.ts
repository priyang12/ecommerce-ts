import {
  UserReviews,
  PostReview,
  GetProductApprovedReviews,
  GetOrderReviews,
  DeleteReview,
} from "../controllers/ReviewController";
import express from "express";
import Auth from "../middleware/AuthMiddleware";

const router = express.Router();

router.route("/").get(Auth, UserReviews).post(Auth, PostReview);
router.route("/:id").delete(Auth, DeleteReview);
router.route("/ProductId/:ProductId").get(GetProductApprovedReviews);
router.route("/OrderID/:OrderID").get(Auth, GetOrderReviews);

export default router;
