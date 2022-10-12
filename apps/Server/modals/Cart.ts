import mongoose from "mongoose";
import type { Model, InferSchemaType } from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
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

export type ICart = InferSchemaType<typeof CartSchema>;

const CartModel: Model<ICart> = mongoose.model("Cart", CartSchema);

export default CartModel;
