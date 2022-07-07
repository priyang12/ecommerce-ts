import mongoose from "mongoose";
import type { Model, InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        qty: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.BcryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(password, salt);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.pre("updateOne", async function (next) {
  // @ts-ignore
  const password = this.getUpdate().$set.password;
  // @ts-ignore
  console.log(this.getUpdate());
  if (!password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  // @ts-ignore
  this.getUpdate().$set.password = await bcrypt.hash(password, salt);
});

export type IUser = InferSchemaType<typeof UserSchema>;
type IUserMethods = {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  BcryptPassword(password: string): Promise<void>;
};

type IUserModel = Model<IUser, {}, IUserMethods>;

const UserModel = mongoose.model("User", UserSchema) as IUserModel;

export default UserModel;
