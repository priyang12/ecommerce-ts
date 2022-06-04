const express = require("express");
const router = express.Router();

const {
  GetWishlist,
  DeleteWishlistProduct,
  AddToWishlist,
} = require("../controllers/WishlistController");

const Auth = require("../middleware/auth");

//Cart
router.route("/").get(Auth, GetWishlist);
router
  .route("/:id")
  .patch(Auth, AddToWishlist)
  .delete(Auth, DeleteWishlistProduct);

module.exports = router;
