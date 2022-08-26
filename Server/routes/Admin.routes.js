import express from "express";

import {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/UserController";

import Admin from "../middleware/AdminMiddleware";

const router = express.Router();

router.route("/users").get(Admin, getUsers);
router
  .route("/users/:id")
  .get(Admin, getUserById)
  .delete(Admin, deleteUser)
  .put(Admin, updateUser);

export default router;
