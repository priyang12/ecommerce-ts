import mongoose from "mongoose";
import type { Model, InferSchemaType } from "mongoose";

const WishSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },

  {
    timestamps: true,
  }
);

export type IWishList = InferSchemaType<typeof WishSchema>;

const WishListModel: Model<IWishList> = mongoose.model("WishList", WishSchema);

export default WishListModel;
