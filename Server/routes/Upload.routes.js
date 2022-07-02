const express = require("express");
const multer = require("multer");
const router = express.Router();
const Admin = require("../middleware/admin");
const imageKit = require("../config/imageKit");
const checkFileType = require("../utils/CheckFile");

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
module.exports = router;
