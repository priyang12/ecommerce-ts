const express = require("express");
const router = express.Router();

const {
  GetWishlist,
  DeleteWishlistProduct,
  AddToWishlist,
} = require("../controllers/WishlistController");

const Auth = require("../middleware/auth");

//Cart
router.route("/").post(Auth, AddToWishlist).get(Auth, GetWishlist);
router.route("/:id").delete(Auth, DeleteWishlistProduct);

module.exports = router;
