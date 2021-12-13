const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  //check token
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
  }
};
