import { ProductValidation } from "@ecommerce/validation";
import express from "express";

import {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
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
  getOrder,
  UpdateOrder,
} from "../controllers/OrderController";

const { UpdateProductValidation, AddProjectValidation } = ProductValidation;

const upload = multer({
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const router = express.Router();

router.route("/users").get(Admin, getUsers);
router
  .route("/users/:id")
  .get(Admin, getUserById)
  .delete(Admin, deleteUser)
  .put(Admin, updateUser);

router
  .route("/product")
  .get(AdminProducts)
  .post(
    Admin,
    ZodMiddleware(AddProjectValidation),
    upload.single("imageFile"),
    AddProduct
  );

router
  .route("/product/:id")
  .get(GetProductByID)
  .put(
    Admin,
    ZodMiddleware(UpdateProductValidation),
    upload.single("imageFile"),
    UpdateProduct
  )
  .delete(Admin, deleteProduct);

router.route("/orders").get(Admin, getAllOrders).delete(Admin, DeleteMany);
router
  .route("/orders/:id")
  .get(Admin, getOrder)
  .put(Admin, UpdateOrder)
  .delete(Admin, DeleteOrder);

export default router;
