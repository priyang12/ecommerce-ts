const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../modals/User");

dotenv.config();

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  //check token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded.id);
    const UserModal = await User.findById(decoded.id).select("-password -__v");
    req.user = decoded;
    req.userModal = UserModal;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
