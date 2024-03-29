import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../modals/User";
dotenv.config();

export default async function (req, res, next) {
  const token = req.header("x-auth-token");
  //check token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json({ msg: "Not authorized as an admin" });
    }
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
}
