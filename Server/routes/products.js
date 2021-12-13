const express = require('express');
const router = express.Router();
const {
  GetAllProducts,
  GetProductByID,
  AddProduct,
  AddReview,
  UpdateProduct,
  deleteProduct,
  GetTopProducts,
} = require('../controllers/ProductController');

const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');

//Product
router.route('/').get(GetAllProducts).post(Admin, AddProduct);
router.route('/top').get(GetTopProducts);
router
  .route('/product/:id')
  .get(GetProductByID)
  .put(Admin, UpdateProduct)
  .delete(Admin, deleteProduct);

router.route('/review/:id').post(Auth, AddReview);

module.exports = router;
