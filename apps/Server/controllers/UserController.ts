import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken";

import dotenv from "dotenv";
import User from "../modals/User";
import Cart from "../modals/Cart";
import WishList from "../modals/Wishlist";

import sgMail from "@sendgrid/mail";
import agenda from "../config/agenda";
import { runInTransaction } from "../utils/Transactions";

import type { Request, Response } from "express";

dotenv.config();

if (process.env.SENDGRID_API_KEY)
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const test = asyncHandler(async (req: Request, res: Response) => {
  res.json(req.headers.host);
});

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 * @body    {email: "", password: ""}
 */

const loginUser = asyncHandler(async (req: Request, res: Response) => {
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

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  await runInTransaction(async (session) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email }).lean();

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create(
      [
        {
          name,
          email,
          password,
        },
      ],
      {
        session,
      }
    );

    await Cart.create({
      user: user[0]._id,
    });

    await WishList.create({
      user: user[0]._id,
    });

    if (user) {
      res.status(201).json({ token: generateToken(user[0]._id) });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });
});

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id)
    .select("-password -__v -cart")
    .lean();

  if (user) {
    res.json(user);
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
const resetpassword = asyncHandler(async (req: Request, res: Response) => {
  const { password } = req.body;

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

const UpdateProfile = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const IfEmailExists = await User.findOne({ email });
  if (IfEmailExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const UserUpdate = await User.findByIdAndUpdate(req.user.id, {
    $set: {
      name: req.body.name,
      email: req.body.email,
    },
  });

  if (!UserUpdate) {
    res.status(404);
    throw new Error("User not found");
  }

  res.json({ msg: "User updated successfully", user: UserUpdate });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */

const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.deleteOne({ _id: req.params.id });
  if (user.acknowledged) {
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

const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const Select = req.query.select ? req.query.select : "-password -cart -__v";
  const Page =
    typeof req.query.page === "string" ? parseInt(req.query.page) : 1;
  const Limit =
    typeof req.query.range === "string" ? parseInt(req.query.range) : 10;

  const users = await User.find({})
    .select(Select)
    .skip((Page - 1) * Limit)
    .limit(Limit)
    .lean();
  const count = await User.countDocuments();
  res.set("x-total-count", JSON.stringify(count));
  res.json(users);
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 * @params  {id: string}
 */

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
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

const getUserById = asyncHandler(async (req: Request, res: Response) => {
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

const updateUser = asyncHandler(async (req: Request, res: Response) => {
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
      isAdmin: updatedUser.isAdmin,
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

const recoverMail = asyncHandler(async (req: Request, res: Response) => {
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

/**
 * @desc    Only For Development
 * @route   PUT /api/users/
 * @access  Private
 * @body    {role: string}
 */

const ChangeRole = asyncHandler(async (req: Request, res: Response) => {
  if (process.env.NODE_ENV !== "development") {
    res.status(403);
    throw new Error("Forbidden");
  }

  const UserUpdate = await User.findByIdAndUpdate(req.user.id, {
    $set: {
      isAdmin: req.body.admin,
    },
  });
  res.json({ msg: "User role Updated successfully", user: UserUpdate });
});

/**
 * @desc    CreateUser For admin
 * @route   PUT /api/admin
 * @access  Admin
 * @body    User
 */

const CreateUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
  });

  if (user) {
    res.status(201).json({
      msg: "User created successfully",
    });
  } else {
    res.status(405);
    throw new Error("Invalid user data");
  }
});

export {
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
  ChangeRole,
  CreateUser,
};
