import express from "express";

import {
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
  recoverMail,
} from "../controllers/UserController";
import Auth from "../middleware/AuthMiddleware";
import Admin from "../middleware/AdminMiddleware";

const router = express.Router();
router.route("/test").get(test);

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/resetpassword").patch(Auth, resetpassword);
router.route("/recoverMail").post(recoverMail);

router
  .route("/")
  .get(Auth, getUserProfile)
  .delete(Auth, deleteAccount)
  .put(Auth, UpdateProfile);

router.route("/admin/all").get(Admin, getUsers);
router
  .route("/admin/:id")
  .delete(Admin, deleteUser)
  .get(Admin, getUserById)
  .put(Admin, updateUser);

export default router;
