const express = require("express");
const router = express.Router();
const {
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
router.route("/").get(GetAllProducts).post(Admin, AddProduct);

router.route("/top").get(GetTopProducts);
router
  .route("/product/:id")
  .get(GetProductByID)
  .put(Admin, upload.single("image"), UpdateProduct)
  .delete(Admin, deleteProduct);

router.route("/review/:id").post(Auth, AddReview);

module.exports = router;
