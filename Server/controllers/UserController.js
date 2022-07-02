const asyncHandler = require("express-async-handler");
const generateToken = require("../middleware/generateToken");

const dotenv = require("dotenv");
const User = require("../modals/User");
const Cart = require("../modals/Cart");

const sgMail = require("@sendgrid/mail");
const agenda = require("../config/agenda");

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const test = asyncHandler(async (req, res) => {
  res.json(req.headers.host);
});

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 * @body    {email: "", password: ""}
 */

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 * @body   {name: string, email: string, password: string}
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  await Cart.create({ user: user._id });

  if (user) {
    res.status(201).json({ token: generateToken(user._id) });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).lean();

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @router PUT api/users/resetpassword
 * @desc  User resetpassword
 * @access Private
 * @body {password: string, password2: string}
 */
const resetpassword = asyncHandler(async (req, res) => {
  const { password, password2 } = req.body;

  if (password !== password2 || password.length < 6 || password2.length < 6) {
    res.status(400);
    throw Error("Invalid passwords");
  }

  await User.updateOne(
    {
      _id: req.user.id,
    },
    {
      $set: {
        password,
      },
    }
  );
  res.json({ message: "Password reset successfully" });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 * @body    {name: string, email: string, password: string}
 */

const UpdateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    if (
      req.body.CurrentPassword &&
      user.matchPassword(req.body.CurrentPassword)
    ) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */

const deleteAccount = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (user.ok === 1) {
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password -cart -__v").lean();
  res.json(users);
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 * @params  {id: string}
 */

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 * @params  {id: string}
 */

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password").lean();

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 * @params  {id: string}
 */

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.is,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Send email for reset password
 * @route   PUT /api/users/:id
 * @access  Private/User
 * @body    {email: string}
 */

const recoverMail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email }).lean();
  if (!user) {
    res.status(400);
    throw Error("user does not exists");
  } else {
    //SEND MAIL
    const token = generateToken(user._id);

    const ag = await agenda;

    ag.start();

    ag.schedule(new Date(Date.now() + 1000), "reset password", {
      email,
      token,
      host: req.headers.host,
    });

    res.json({ message: "Mail has been check your inbox, might be in Spam" });
  }
});

module.exports = {
  test,
  registerUser,
  loginUser,
  deleteAccount,
  deleteUser,
  UpdateProfile,
  updateUser,
  getUserById,
  getUserProfile,
  getUsers,
  resetpassword,
  recoverMail,
};
