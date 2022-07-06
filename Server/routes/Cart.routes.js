const express = require('express');
const router = express.Router();

const {
  AddToCart,
  GetCartProducts,
  DeleteCartProduct,
} = require('../controllers/CartController');

const Auth = require('../middleware/auth');

//Cart
router.route('/').post(Auth, AddToCart).get(Auth, GetCartProducts);
router.route('/:id').delete(Auth, DeleteCartProduct);

module.exports = router;
