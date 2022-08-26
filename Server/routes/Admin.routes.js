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
  deleteProduct,
  GetAllProducts,
  UpdateProduct,
} from "../controllers/ProductController";

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
  .get(GetAllProducts)
  .post(
    Admin,
    ZodMiddleware(AddProjectValidation),
    upload.single("imageFile"),
    AddProduct
  )
  .put(
    Admin,
    ZodMiddleware(UpdateProductValidation),
    upload.single("imageFile"),
    UpdateProduct
  )
  .delete(Admin, deleteProduct);

export default router;
