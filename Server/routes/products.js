const express = require("express");
const router = express.Router();
const {
  GetAllDetailsProducts,
  GetAllProducts,
  GetProductByID,
  AddProduct,
  AddReview,
  UpdateProduct,
  deleteProduct,
  GetTopProducts,
} = require("../controllers/ProductController");

const checkFileType = require("../utils/CheckFile");
const multer = require("multer");
const Auth = require("../middleware/auth");
const Admin = require("../middleware/admin");

const upload = multer({
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
//Product
router.route("/").get(GetAllProducts);
router.route("/all").get(Admin, GetAllDetailsProducts);

router.route("/top").get(GetTopProducts);
router.route("/add").post(Admin, upload.single("image"), AddProduct);
router
  .route("/product/:id")
  .get(GetProductByID)
  .put(Admin, upload.single("image"), UpdateProduct)
  .delete(Admin, deleteProduct);

// Search
router.route("/Search").get(GetAllProducts);

router.route("/review/:id").post(Auth, AddReview);

module.exports = router;
