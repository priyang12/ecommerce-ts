const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getUserOrders,
  getOrder,
  getAllOrders,
  UpdateOrder,
  DeleteOrder,
} = require('../controllers/OrderController');
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');

router.route('/').post(Auth, addOrderItems).get(Auth, getUserOrders);

router
  .route('/order/:id')
  .get(Auth, getOrder)
  .put(Admin, UpdateOrder)
  .delete(Admin, DeleteOrder);

//Admin
router.route('/all').get(Admin, getAllOrders);
module.exports = router;
