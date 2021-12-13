const express = require('express');
const router = express.Router();
const {
  test,
  loginUser,
  registerUser,
  getUserProfile,
  UpdateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  deleteAccount,
  resetpassword,
  sendToken,
} = require('../controllers/UserController');
const Auth = require('../middleware/auth');
const Admin = require('../middleware/admin');

router.route('/test').get(test);

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/resetpassword').post(sendToken).put(Auth, resetpassword);

router
  .route('/')
  .get(Auth, getUserProfile)
  .delete(Auth, deleteAccount)
  .put(Auth, UpdateProfile);

router.route('/admin/all').get(Admin, getUsers);
router
  .route('/admin/:id')
  .delete(Admin, deleteUser)
  .get(Admin, getUserById)
  .put(Admin, updateUser);

module.exports = router;
