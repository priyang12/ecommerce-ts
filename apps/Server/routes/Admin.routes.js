import { CreateUserValidation } from "@ecommerce/validation";
import express from "express";

import {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  CreateUser,
} from "../controllers/UserController";
import checkFileType from "../utils/CheckFile";
import multer from "multer";
import Admin from "../middleware/AdminMiddleware";
import ZodMiddleware from "../middleware/ZodMiddleware";
import {
  AddProduct,
  AdminProducts,
  deleteProduct,
  UpdateProduct,
  GetProductByID,
} from "../controllers/ProductController";
import {
  DeleteMany,
  DeleteOrder,
  getAllOrders,
  getLastMonth,
  getOrder,
  UpdateOrder,
} from "../controllers/OrderController";

const upload = multer({
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const router = express.Router();

router
  .route("/users")
  .get(Admin, getUsers)
  .post(Admin, ZodMiddleware(CreateUserValidation), CreateUser);
router
  .route("/users/:id")
  .get(Admin, getUserById)
  .delete(Admin, deleteUser)
  .put(Admin, updateUser);

router
  .route("/product")
  .get(AdminProducts)
  .post(Admin, upload.single("imageFile"), AddProduct);

router
  .route("/product/:id")
  .get(GetProductByID)
  .put(Admin, upload.single("imageFile"), UpdateProduct)
  .delete(Admin, deleteProduct);

router.route("/orders").get(Admin, getAllOrders).delete(Admin, DeleteMany);
router.route("/orders/lastMonth").get(Admin, getLastMonth);
router
  .route("/orders/:id")
  .get(Admin, getOrder)
  .put(Admin, UpdateOrder)
  .delete(Admin, DeleteOrder);

export default router;
