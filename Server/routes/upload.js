const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const Admin = require('../middleware/admin');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'Server/Photos/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post('/', Admin, upload.single('image'), (req, res) => {
  try {
    res.send(`/Photos/${req.file.filename}`);
  } catch (error) {
    throw Error(error);
  }
});

module.exports = router;
