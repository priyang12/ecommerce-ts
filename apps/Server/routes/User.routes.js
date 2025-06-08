import express from "express";
import {
  test,
  loginUser,
  registerUser,
  getUserProfile,
  UpdateProfile,
  deleteAccount,
  resetpassword,
  recoverMail,
  ChangeRole,
} from "../controllers/UserController";
import Auth from "../middleware/AuthMiddleware";
import ZodMiddleware from "../middleware/ZodMiddleware";
import {
  LoginSchema,
  RegisterSchema,
  ResetpasswordSchema,
  UpdateUserProfileSchema,
  recoverMailSchema,
} from "../validation";

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

export default router;
