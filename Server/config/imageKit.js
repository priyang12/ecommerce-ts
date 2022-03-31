const ImageKit = require("imagekit");
const dotenv = require("dotenv");

dotenv.config();

const imageKit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.END_POINT,
});

module.exports = imageKit;
