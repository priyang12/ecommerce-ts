import express from "express";
import multer from "multer";

import Admin from "../middleware/AdminMiddleware";
import imageKit from "../config/imageKit";
import checkFileType from "../utils/CheckFile";

const router = express.Router();

const upload = multer({
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/kit", Admin, upload.single("image"), (req, res) => {
  try {
    imageKit
      .upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        // @ts-ignore
        tags: ["test", "image"],
      })
      .then((uploadedImage) => {
        res.status(200).json({
          msg: "Image Uploaded",
          image: `${uploadedImage.url}`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg: "Image Upload Fail",
          error: error.message,
        });
      });
  } catch (error) {
    throw Error(error);
  }
});
export default router;
