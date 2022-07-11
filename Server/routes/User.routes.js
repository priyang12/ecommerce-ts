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
  ChangeRole,
} from "../controllers/UserController";
import Auth from "../middleware/AuthMiddleware";
import Admin from "../middleware/AdminMiddleware";
import ZodMiddleware from "../middleware/ZodMiddleware";
import { UserValidation } from "@ecommerce/validation";

const {
  LoginSchema,
  RegisterSchema,
  ResetpasswordSchema,
  UpdateUserProfileSchema,
  recoverMailSchema,
} = UserValidation;

const router = express.Router();
router.route("/test").get(test);
router.route("/role").post(Auth, ChangeRole);

router.route("/register").post(ZodMiddleware(RegisterSchema), registerUser);
router.route("/login").post(ZodMiddleware(LoginSchema), loginUser);
router
  .route("/resetpassword")
  .patch(Auth, ZodMiddleware(ResetpasswordSchema), resetpassword);
router
  .route("/recoverMail")
  .post(ZodMiddleware(recoverMailSchema), recoverMail);

router
  .route("/")
  .get(Auth, getUserProfile)
  .delete(Auth, deleteAccount)
  .put(Auth, ZodMiddleware(UpdateUserProfileSchema), UpdateProfile);

router.route("/admin/all").get(Admin, getUsers);
router
  .route("/admin/:id")
  .delete(Admin, deleteUser)
  .get(Admin, getUserById)
  .put(Admin, updateUser);

export default router;
